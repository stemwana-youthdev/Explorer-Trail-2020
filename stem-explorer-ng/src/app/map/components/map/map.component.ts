import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { map } from 'rxjs/operators';
import { ChallengesState } from 'src/app/store/challenges/challenges.state';
import { VisitedHomepage } from 'src/app/store/last-homepage/last-homepage.actions';
import { LoadLocationsData } from 'src/app/store/locations/locations.actions';
import { LocationsState } from 'src/app/store/locations/locations.state';
import { Location } from '../../../shared/models/location';
import { MapConfigService } from '../../services/map-config.service';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';

interface InfoLocationClickEvent {
  location: Location;
  marker: MapMarker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  // providers: [MapConfigService]
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  locations: Location[] = [];
  filter: number[] = [];
  taurangaLocation = {
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

    this.store.select(ChallengesState.challengeFilter).pipe(map(res => {
      this.filter = res;
    })).subscribe();
  }

  ngOnDestroy(): void {
    navigator.geolocation?.clearWatch(this.geolocationWatchId);
  }

  navigateToList(): void {
    this.router.navigateByUrl('/list');
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
    if (location.challengeId) {
      this.challengeLocation(location);
    } else {
      this.infoLocation({ location, marker });
    }
  }

  markerOptions(location: Location): google.maps.MarkerOptions {
    return {
      icon: {
        url: this.mapConfig.mapIcons()[location.category],
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
    this.gtmTag(location.challengeTitle);
  }

  /**
   * @todo do we have info location information yet?
   * @param object location detail and marker detail
   */
  private infoLocation({ location, marker }: InfoLocationClickEvent) {
    this.infoWindow.open(marker);
  }

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

  private gtmTag(title: string): void {
    const tag = {
      event: 'map marker click',
      challengeTitle: title
    };
    this.gtmService.pushTag(tag);
  }
}
