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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [FilterLocationsPipe]
})
export class Map2Component implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  @ViewChild('mapInfoWindow', { static: false }) infoWindow: ElementRef;
  map: google.maps.Map;
  markers: any[] = [];

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
    this.getDistanceToLocation(location.position);
    this.location = location;
    // this.infoWindow.open(marker);
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
    filtered.forEach(loc => {

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(loc.position),
        map: this.map,
      });

      const infoW = new google.maps.InfoWindow({
        content: ``
      });
      marker.addListener('click', () => {
        infoW.open(marker.getMap(), marker);
      });

      this.markers.push(marker);
    });

    const userMarker = new google.maps.Marker({
      position: new google.maps.LatLng(this.userLocationLat, this.userLocationLng),
      map: this.map,
      icon: '/assets/icons/personMarker.png'
    });
    this.markers.push(userMarker);

    this.markers.forEach(m => m.setMap(this.map));
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
