import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { MapMarker } from '@angular/google-maps/map-marker/map-marker';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChallengeDialogType } from 'src/app/shared/enums/challenge-dialog-type.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { Location, LocationChallenge } from 'src/locations/models/location';
import { GeolocationService } from 'src/locations/services/geolocation.service';
import { MapConfigService } from 'src/locations/services/map-config.service';
import { LoadLastFilter, LoadLocationsData } from 'src/locations/store/locations.actions';
import { LocationsState } from 'src/locations/store/locations.state';
import { ChallengeDialogComponent } from '../challenge-dialog/challenge-dialog.component';
import { CategoryIcons } from 'src/app/shared/enums/category-icons.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Select(LocationsState.locationFilter) public filter$: Observable<number[]>;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  locations: Location[] = [];
  zoom = 16;
  center: google.maps.LatLngLiteral;
  userLocation: google.maps.LatLngLiteral;
  options: google.maps.MapOptions;
  location: Location;
  Colour = StemColours;
  Icon = CategoryIcons;
  locationAccess = false;
  tilesLoaded = false;
  distance: string;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private gtmService: GoogleTagManagerService,
    private mapConfig: MapConfigService,
    private geolocation: GeolocationService,
    private router: Router
  ) {
    this.options = this.mapConfig.mapOptions();
    this.geolocation.getMapCentre().then(pos => {
      this.center = {
        lat: pos.lat,
        lng: pos.lng
      };
    });
    this.geolocation.getPosition().then(pos => {
      if (pos) {
        this.userLocation = {
          lat: pos.lat,
          lng: pos.lng
        };
      }
    });

    this.locationAccess = !navigator.geolocation;
  }

  ngOnInit() {
    this.store.dispatch(new LoadLocationsData());
    this.store.dispatch(new LoadLastFilter());
    this.getLocations();
  }

  trackLocations(_: number, item: Location) {
    return item?.uid;
  }

  trackChallenges(_: number, item: LocationChallenge) {
    return item?.challengeId;
  }

  /**
   * Method for when a user clicks on a map marker on the map. Shows the location details and the list of challenges
   * and gets the distance from user's current position to the location.
   * @param marker google MapMarker object
   * @param location location of mapmarker
   */
  click(marker: MapMarker, location: Location): void {
    this.getDistanceToLocation(location.position);
    this.location = location;
    this.infoWindow.open(marker);
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
        dialogType: ChallengeDialogType.Preview,
      },
      panelClass: 'app-dialog',
    });
    this.addGtmTag('open challenge info', challenge.challengeTitle);
  }

  /**
   * Method for getting the map marker icon. Checks if the location has more then one challenge, and if so will show a different icon
   * but otherwise will show an icon for that challenge category.
   * @param location location data object
   */
  getMarkerOptions(location: Location): google.maps.MarkerOptions {
    let iconUrl = this.mapConfig.mapMarkerIcons(4);
    if (location.challengeCount === 1) {
      iconUrl = this.mapConfig.mapMarkerIcons(location.locationChallenges[0].challengeCategory);
    }
    return {
      icon: {
        url: `/assets/icons/${iconUrl}`,
        scaledSize: new google.maps.Size(30, 48)
      }
    };
  }

  /**
   * Gets an icon to show the users position on the map.
   */
  userMarkerPoint(): google.maps.MarkerOptions {
    return {
      icon: {
        url: '/assets/icons/personMarker.png'
      }
    };
  }

  /**
   * Gets all locations from API
   */
  private getLocations(): void {
    this.store.select(LocationsState.locations).pipe(map(res => {
      this.locations = res;
    })).subscribe();
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
