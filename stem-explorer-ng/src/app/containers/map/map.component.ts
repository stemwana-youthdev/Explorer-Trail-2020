import { MapMarker, MapInfoWindow } from '@angular/google-maps';
import { ApiService } from './../../shared/services/api.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Location, LocationChallengeInfo } from '../../shared/models/location';
import { Router } from '@angular/router';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { ListViewDialogComponent } from 'src/app/components/list-view-dialog/list-view-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  // tslint:disable: variable-name
  private _locations: Location[] = [];
  zoom = 17;
  center: google.maps.LatLngLiteral;
  geolocationWatchId: number;
  filter = [0, 1, 2, 3];

  // separate property for the information for the map pop up
  infoLocation = null as Location;

  // local property to store the json data from getLocations
  get locations(): Location[] {
    return this._locations;
  }

  // controls what function is shown on the map
  options: google.maps.MapOptions = {
    scrollwheel: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 8,
    gestureHandling: 'cooperative', // for gesture controls
    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road',
        stylers: [{ visibility: 'simplified' }],
      },
      {
        featureType: 'landscape',
        stylers: [{ visibility: 'simplified' }],
      },
      {
        featureType: 'administrative',
        stylers: [{ visibility: 'off' }],
      },
      {
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  // added a dependency injection in order to use the getLocations method without creating an instance of the object
  constructor(
    private service: ApiService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    // set maps to the center of Tauranga
    this.center = {
      lat: -37.6854709,
      lng: 176.1673285,
    };
    this.loadLocations();
    this.loadGeolocation();
  }

  /**
   * uses the ApiService to call on the getLocations method to open a listerning stream to get the data from the json file
   */
  loadLocations() {
    this.service.getLocations().subscribe((locations) => {
      // store the data in a local property
      this._locations = locations;
    });
  }

  loadGeolocation() {
    this.center = {
      lat: -37.6854709,
      lng: 176.1673285,
    };

    // if (!navigator.geolocation) {
    //   console.warn('Geolocation not supported');
    //   this.center = {
    //     lat: -37.6854709,
    //     lng: 176.1673285,
    //   };
    // } else {
    //   this.geolocationWatchId = navigator.geolocation.watchPosition((position) => {
    //     const { latitude, longitude } = position.coords;
    //     this.center = {
    //       lat: latitude,
    //       lng: longitude,
    //     };
    //   });
    // }
  }

  ngOnDestroy() {
    navigator.geolocation?.clearWatch(this.geolocationWatchId);
  }

  getIconForMarker(markerInfo: Location): google.maps.Icon {
    const icons = {
      [Categories.Science]: '/assets/icons/light green point.svg',
      [Categories.Technology]: '/assets/icons/light blue point.svg',
      [Categories.Engineering]: '/assets/icons/light orange point.svg',
      [Categories.Maths]: '/assets/icons/purple point.svg',
    };

    console.warn(markerInfo.locationChallenges.challengeCateogry)

    return {
      url: icons[markerInfo.locationChallenges.challengeCateogry],
      scaledSize: new google.maps.Size(30, 48),
    };
  }

  openInfo(marker: MapMarker, location: Location) {
    const challenge = location.locationChallenges;
    if (challenge.challengeId) {
      this.dialog.open(ListViewDialogComponent, {
        data: {
          challenge: {
            uid: challenge.challengeId,
            title: challenge.challengeTitle,
            category: challenge.challengeCateogry,
            description: challenge.challengeDescription,
          },
          name: location.name,
          link: location.link
        }
      });
    } else {
      this.infoLocation = location;
      this.infoWindow.open(marker);
    }
  }
}


