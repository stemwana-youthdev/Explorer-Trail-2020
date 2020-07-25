import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MapMarker, MapInfoWindow } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ApiService } from './../../shared/services/api.service';
import { ChallengesState } from '../../store/challenges/challenges.state';

import { Categories } from '../../shared/enums/categories.enum';
import { Location } from '../../shared/models/location';

import { ListViewDialogComponent } from '../../components/list-view-dialog/list-view-dialog.component';


  // tslint:disable: no-string-literal
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  @Select(ChallengesState.challengeFilter) public filter$: Observable<number[]>;

  // added a dependency injection in order to use the getLocations method without creating an instance of the object
  constructor(
    private service: ApiService,
    private dialog: MatDialog,
  ) {}

  zoom = 15;
  center: google.maps.LatLngLiteral;
  geolocationWatchId: number;

  // local property to store the json data from getLocations
  location: Location[] = [];

  // separate property for the information for the map pop up
  infoLocation = null as Location;

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

  icons = {
    [Categories.Science]: '/assets/icons/light green point.svg',
    [Categories.Technology]: '/assets/icons/light blue point.svg',
    [Categories.Engineering]: '/assets/icons/light orange point.svg',
    [Categories.Maths]: '/assets/icons/purple point.svg',
  };

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  ngOnInit() {
    // set maps to the center of Tauranga
    this.center = {
      lat: -37.6854709,
      lng: 176.1673285,
    };
    this.loadLocation();
    this.loadGeolocation();
  }

  /**
   * uses the ApiService to call on the getLocations method to open a listerning stream to get the data from the json file
   */
  loadLocation() {
    this.service.getLocations().subscribe((l) => {
      // store the data in a local property
      this.location = l.location;
    });
  }

  loadGeolocation() {
    if (!navigator.geolocation) {
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

  ngOnDestroy() {
    navigator.geolocation?.clearWatch(this.geolocationWatchId);
  }

  getIconForMarker(marker: Location): google.maps.Icon {
    return {
      url: this.icons[marker.category],
      scaledSize: new google.maps.Size(30, 48),
    };
  }

  openInfo(marker: MapMarker, location: Location) {
    if (location.challengeid) {
      this.dialog.open(ListViewDialogComponent, {
        data: {
          challenge: {
            uid: location.challengeid,
            title: location.challengetitle,
            category: location.category,
            description: location.challengedescription,
          },
          name: location.name,
          link: location.link
        },
        panelClass: 'app-dialog',
      });
    } else {
      this.infoLocation = location;
      this.infoWindow.open(marker);
    }
  }
}


