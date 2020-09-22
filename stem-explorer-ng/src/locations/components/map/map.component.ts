import {
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Component,
  OnDestroy,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { MapConfigService } from 'src/locations/services/map-config.service';
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
import { Store } from '@ngxs/store';
import { LocationsState } from 'src/locations/store/locations.state';
import { LoadLocationsData } from 'src/locations/store/locations.actions';
import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { VisitedHomepage } from 'src/app/store/last-homepage/last-homepage.actions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [FilterLocationsPipe]
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  @ViewChild('infoWindow', { static: false }) infoWindow: TemplateRef<unknown>;
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
  locationsSubscription: any;
  tilesLoaded = false;

  infoW: google.maps.InfoWindow;
  userMarker: google.maps.Marker;
  portal: TemplatePortal<any>;

  constructor(
    private mapConfig: MapConfigService,
    private store: Store,
    private filterLocations: FilterLocationsPipe,
    private geolocation: GeolocationService,
    private gtmService: GoogleTagManagerService,
    private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private defaultInjector: Injector,
    private viewContainerRef: ViewContainerRef,
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
    this.store.dispatch(new VisitedHomepage());
    this.getLocations();
  }

  ngAfterViewInit(): void {
    this.mapInit();
  }

  ngOnDestroy(): void {
    this.locationsSubscription?.unsubscribe();
  }

  trackLocations(_: number, item: Location) {
    return item?.uid;
  }

  trackChallenges(_: number, item: LocationChallenge) {
    return item?.challengeId;
  }

  mapInit(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapConfig.mapOptions());
    this.map.addListener('tilesloaded', () => {
      this.tilesLoaded = true;
    });
    this.map.addListener('click', () => {
      this.infoW?.close();
    });
    this.setMapMarkers();
  }

  filterChanged(filter: Filter) {
    this.filter = filter;
    this.setMapMarkers();
  }

  clickOnMarker(marker, location: Location): void {
    this.getDistanceToLocation(location.position);
    this.location = location;

    this.infoW?.close();
    this.portal?.detach();

    this.infoW = new google.maps.InfoWindow({
      content: '<div id="info-window-container"></div>'
    });
    this.infoW.open(marker.getMap(), marker);

    this.infoW.addListener('domready', () => {
      const el = this.gmap.nativeElement as HTMLElement;
      const container = el.querySelector('#info-window-container');
      // Dom Portals allow us to display Angular components inside
      // non-Angular DOM elements
      const portalOutlet = new DomPortalOutlet(
        container,
        this.componentFactoryResolver,
        this.appRef,
        this.defaultInjector
      );
      const portal = new TemplatePortal(this.infoWindow, this.viewContainerRef);
      portal.attach(portalOutlet);
      this.portal = portal;
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
   * Gets all locations from store
   */
  private getLocations(): void {
    this.store.dispatch(new LoadLocationsData());

    this.locationsSubscription = this.store
      .select(LocationsState.locations)
      .subscribe((res) => {
        this.locations = res;
        this.setMapMarkers();
      });
  }

  private setMapMarkers(): void {
    if (!this.locations || !this.filter) { return; }

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
