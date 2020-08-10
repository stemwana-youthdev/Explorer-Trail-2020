import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { LocationsState } from 'src/app/store/locations/locations.state';
import { ChallengesState } from 'src/app/store/challenges/challenges.state';
import { LoadLocationsData } from 'src/app/store/locations/locations.actions';
import { VisitedHomepage } from 'src/app/store/last-homepage/last-homepage.actions';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';
import { Location } from '../../../shared/models/location';
import { Router } from '@angular/router';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { MapConfigService } from '../../services/map-config.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { map } from 'rxjs/operators';


export interface InfoLocationClickEvent {
  location: Location;
  marker: MapMarker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapConfigService]
})
export class MapComponent implements OnInit, OnDestroy {
  // @Select(LocationsState.locations) public locations$: Observable<Location[]>;
  // @Select(ChallengesState.challengeFilter) public filter$: Observable<number[]>;
  // @ViewChild(ChallengeMapComponent, { static: false }) challengeMap: ChallengeMapComponent;

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  locations: Location[] = [];
  filter: number[] = [];
  // infoLocation = null as Location;
  private taurangaLocation = {
    lat: -37.6854709,
    lng: 176.1673285,
  };
  private geolocationWatchId: number;
  zoom = 15;
  center: google.maps.LatLngLiteral = this.taurangaLocation;
  options;

  private icons = {
    [Categories.Science]: '/assets/icons/MAP-light-green-point.svg',
    [Categories.Technology]: '/assets/icons/MAP-light-blue-point.svg',
    [Categories.Engineering]: '/assets/icons/MAP-light-orange-point.svg',
    [Categories.Maths]: '/assets/icons/MAP-purple-point.svg',
  };

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

    this.store.select(ChallengesState.challengeFilter).pipe(map(res => {
      this.filter = res;
    })).subscribe();
  }

  ngOnDestroy() {
    navigator.geolocation?.clearWatch(this.geolocationWatchId);
  }

  navigateToList(): void {
    this.router.navigateByUrl('/list-view');
  }

  scanCode(): void {
    this.router.navigate(['/scan-code']);
  }

  getLocations(): void {
    this.store.select(LocationsState.locations).pipe(map(res => {
      this.locations = res;
    })).subscribe();
  }

  markerClick(marker: MapMarker, location: Location): void {
    if (location.challengeid) {
      this.challengeLocation(location);
    } else {
      this.infoLocation({ location, marker });
    }
  }

  markerOptions(location: Location): google.maps.MarkerOptions {
    return {
      icon: {
        url: this.icons[location.category],
        scaledSize: new google.maps.Size(30, 48),
      }
    };
  }

  private challengeLocation(location: Location): void {
    this.dialog.open(ChallengeDialogComponent, {
      data: { location },
      panelClass: 'app-dialog',
    });
    // push to dataLayer
    this.gtmTag(location.challengetitle);
  }

  /**
   * @todo do we have info location information yet?
   * @param object location detail and marker detail
   */
  private infoLocation({ location, marker }: InfoLocationClickEvent) {
    this.infoWindow.open(marker);
  }

  private loadGeolocation() {
    if (!navigator.geolocation) {
      /** @todo need to tell the user that geolocation isn't supported */
      console.warn('Geolocation not supported');
      return;
    }

    this.geolocationWatchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.center = {
        lat: latitude,
        lng: longitude,
      };
    });
  }

  private gtmTag(title: string) {
    const tag = {
      event: 'map marker click',
      challengeTitle: title
    };
    this.gtmService.pushTag(tag);
  }
}
