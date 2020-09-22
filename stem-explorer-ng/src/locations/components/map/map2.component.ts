import { OnInit, AfterViewInit, ViewChild, ElementRef, Component, Input } from '@angular/core';
import { MapConfigService } from 'src/locations/services/map-config.service';
import { LocationApiService } from 'src/locations/services/locations-api.service';
import { Location, LocationChallenge } from '../../models/location';
import { Filter } from 'src/locations/models/filter';
import { FilterLocationsPipe } from 'src/app/shared/pipes/filter-locations.pipe';
import { GeolocationService } from 'src/locations/services/geolocation.service';
import { map } from 'rxjs/operators';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { LargeCategoryIcons } from 'src/app/shared/enums/large-category-icons.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { MatDialog } from '@angular/material';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';
import { MapIcon } from 'src/locations/models/map-icons.constant';
import { MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [FilterLocationsPipe]
})
export class Map2Component implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  @ViewChild('infoWindow', { static: false }) infoWindow: google.maps.InfoWindow;
  map: google.maps.Map;
  markers = new Map<Location, google.maps.Marker>();

  filter: Filter;
  locations: Location[];
  location: Location;
  distance: string;
  userLocation: google.maps.LatLngLiteral;
  userLocationLat: number;
  userLocationLng: number;
  Colour = StemColours;
  Icon = LargeCategoryIcons;
  locationAccess = false;

  infoW: google.maps.InfoWindow;
  userMarker: google.maps.Marker;

  constructor(
    private mapConfig: MapConfigService,
    private api: LocationApiService,
    private filterLocations: FilterLocationsPipe,
    private geolocation: GeolocationService,
    private gtmService: GoogleTagManagerService,
    private dialog: MatDialog,
  ) {
    this.geolocation.getPosition().then(pos => {
      if (pos) {
        this.userLocationLat = pos.lat;
        this.userLocationLng = pos.lng;
        this.userLocation = {
          lat: pos.lat,
          lng: pos.lng
        };

        if (this.userMarker) {
          this.userMarker.setPosition(pos);
        }
      }
    });

    this.locationAccess = !navigator.geolocation;
  }

  ngOnInit(): void {
    this.getLocations();
  }

  ngAfterViewInit(): void {
    this.mapInit();
  }

  trackLocations(_: number, item: Location) {
    return item?.uid;
  }

  trackChallenges(_: number, item: LocationChallenge) {
    return item?.challengeId;
  }

  mapInit(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapConfig.mapOptions());
  }

  filterChanged(filter: Filter) {
    this.filter = filter;
    this.setMapMarkers();
  }

  clickOnMarker(marker, location: Location): void {
    console.warn('click on marker')
    this.getDistanceToLocation(location.position);
    this.location = location;
    // this.infoWindow.open(marker);

    let buttons = '';
    location.locationChallenges.forEach(c => {
      buttons += `<button mat-flat-button class="mat-flat-button ${this.Colour[c.challengeCategory]}"` +
        ` data-challenge-id="${c.challengeId}">` +
        `View Challenge <mat-icon [svgIcon]="Icon[c.challengeCategory]"></mat-icon></button>`;
    });

    this.infoW?.close();

    this.infoW = new google.maps.InfoWindow({
      content: `<div fxLayout="row" fxLayoutAlign="space-between"><h3>` +
        `${location.name}</h3></div>` +
        `${buttons}`
    });
    this.infoW.open(marker.getMap(), marker);
    this.infoW.addListener('domready', () => {
      const el = this.gmap.nativeElement as HTMLElement;
      const btns = el.querySelectorAll('.mat-flat-button');
      btns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const challengeId = +btn.getAttribute('data-challenge-id');
          const challenge = location.locationChallenges.find((c) => c.challengeId === challengeId);
          this.openChallenge(location, challenge);
        });
      });
    });
    this.addGtmTag('open location info', location.name);
  }

  /**
   * Method fired when user clicked on a challenge button in the Location info window. Triggers the Challenge dialog box.
   * @param location location data object
   * @param challenge individual challenge
   * @todo have a contact/links object in the location info, so we can send through that and only location name. Currently
   * if location has multiple challenges they also get sent through.
   */
  openChallenge(location: Location, challenge: LocationChallenge): void {
    this.dialog.open(ChallengeDialogComponent, {
      data: {
        challenge,
        location,
      },
      panelClass: 'app-dialog',
    });
    this.addGtmTag('open challenge info', challenge.challengeTitle);
  }

  /**
   * Gets all locations from API
   */
  private getLocations(): void {
    this.api.getLocations().subscribe((res) => {
      this.locations = res;
      this.setMapMarkers();
    });
  }

  private setMapMarkers(): void {
    if (!this.locations) { return; }

    const filtered = this.filterLocations.transform(this.locations, this.filter);

    // Delete markers that are no longer shown
    this.markers.forEach((marker, loc) => {
      const stillVisible = filtered.indexOf(loc) >= 0;
      if (!stillVisible) {
        marker.setMap(null);
        this.markers.delete(loc);
      }
    });

    // Add new markers
    filtered.forEach(loc => {
      if (this.markers.has(loc)) {
        // Don't create duplicate markers
        return;
      }

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(loc.position),
        title: loc.name,
        map: this.map,
        icon: {
          url: this.returnMapIcon(loc.locationChallenges),
          scaledSize: new google.maps.Size(30, 48)
        }
      });

      marker.addListener('click', () => {
        this.clickOnMarker(marker, loc);
      });

      this.markers.set(loc, marker);
    });

    if (!this.userMarker) {
      this.userMarker = new google.maps.Marker({
        position: new google.maps.LatLng(this.userLocationLat, this.userLocationLng),
        map: this.map,
        icon: '/assets/icons/personMarker.png'
      });
    }
    this.userMarker.setMap(this.map);

    this.markers.forEach(m => m.setMap(this.map));
  }

  returnMapIcon(challenges: LocationChallenge[]) {
    if (challenges.length > 1) {
      return MapIcon[4];
    }
    return MapIcon[challenges[0].challengeCategory];
  }

  /**
   * Gets the distance to location. Resets distance to an empty string to prevent previous distance
   * from showing in the Info Window, and only assigns the distance text to it if current has a
   * current position. If user does not have a current position, then obs returns undefined and distance
   * remains as an empty string.
   * @param position the lat and lng object of a location
   */
  private getDistanceToLocation(position: google.maps.LatLngLiteral): void {
    this.distance = '';

    if (this.userLocation) {
      this.geolocation.getDistance(position, this.userLocation).pipe(
        map(res => this.distance = res)
      ).subscribe();
    }
  }

  /**
   * add tag to GTM on the card click
   * @param title challenge title
   */
  private addGtmTag(event: string, title: string): void {
    const gtmTag = { event, title };
    this.gtmService.pushTag(gtmTag);
  }
}
