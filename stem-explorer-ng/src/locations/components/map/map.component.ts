import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { map, tap } from 'rxjs/operators';
import { VisitedHomepage } from 'src/app/store/last-homepage/last-homepage.actions';
import { LoadLocationsData } from 'src/locations/store/locations.actions';
import { MapConfigService } from 'src/locations/services/map-config.service';
import { Location } from 'src/app/shared/models/location';
import { LocationsState } from 'src/locations/store/locations.state';
import { Observable } from 'rxjs';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';

interface InfoLocationClickEvent {
  location: Location;
  marker: MapMarker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @Select(LocationsState.locationFilter) public filter$: Observable<number[]>;

  locations: Location[] = [];
  filter: number[];
  private taurangaLocation = {
    lat: -37.6854709,
    lng: 176.1673285,
  };
  private geolocationWatchId: number;

  zoom = 16;
  center: google.maps.LatLngLiteral = this.taurangaLocation;
  options: google.maps.MapOptions;

  // added a dependency injection in order to use the getLocations method without creating an instance of the object
  constructor(
    private store: Store,
    private dialog: MatDialog,
    private gtmService: GoogleTagManagerService,
    private router: Router,
    readonly mapConfig: MapConfigService
  ) {
    this.options = this.mapConfig.mapOptions();
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadLocationsData());
    this.store.dispatch(new VisitedHomepage());
    this.loadGeolocation();
    this.getLocations();

    this.filter$.pipe(tap(res => this.filter = res)).subscribe();
  }

  /**
   * when the user leaves this view, then stop watching the geolocation the clear this data
   */
  ngOnDestroy(): void {
    navigator.geolocation?.clearWatch(this.geolocationWatchId);
  }

  /**
   * go to the list view
   */
  navigateToList(): void {
    this.router.navigate(['list']);
  }

  /**
   * scan the qr code
   */
  scanCode(): void {
    this.router.navigate(['scan-code']);
  }

  /**
   * method to tell the store to load the locations
   */
  getLocations(): void {
    this.store.select(LocationsState.locations).pipe(map(res => {
      this.locations = res;
    })).subscribe();
  }

  /**
   * method hit when one of the map markers are clicked on
   * @param marker object of the marker data
   * @param location object of the location data
   */
  markerClick(marker: MapMarker, location: Location): void {
    if (location.challengeId) {
      this.challengeLocation(location);
    } else {
      this.infoLocation({ location, marker });
    }
  }

  /**
   * gets the custom marker data, like the icon
   * @param location data from the location for the map marker to get the category
   */
  markerOptions(location: Location): google.maps.MarkerOptions {
    return {
      icon: {
        url: this.mapConfig.mapIcons()[location.category],
        scaledSize: new google.maps.Size(30, 48),
      }
    };
  }

  // onFilter(filters: number[]) {
  //   this.locations.
  // }

  /**
   * opens the dialog of the challenge info
   * @param location data object to pass through all the location details to the dialog
   */
  private challengeLocation(location: Location): void {
    this.dialog.open(ChallengeDialogComponent, {
      data: { location },
      panelClass: 'app-dialog',
    });
    // push to dataLayer
    this.gtmTag(location.challengeTitle);
  }

  /**
   * @todo do we have info location information yet?
   * @param object location detail and marker detail
   */
  private infoLocation({ location, marker }: InfoLocationClickEvent) {
    this.infoWindow.open(marker);
  }

  /**
   * loads the user's location
   */
  private loadGeolocation(): void {
    if (!navigator.geolocation) {
      /** @todo need to tell the user that geolocation isn't supported */
      console.warn('Geolocation not supported');
      return;
    }

    this.geolocationWatchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      // this.center = {
      //   lat: latitude,
      //   lng: longitude,
      // };
    });
  }

  /**
   * google tag manager logging
   * @param title challenge title
   */
  private gtmTag(title: string): void {
    const tag = {
      event: 'map marker click',
      challengeTitle: title
    };
    this.gtmService.pushTag(tag);
  }
}
