import { MapMarker, MapInfoWindow } from '@angular/google-maps';
import { ApiService } from './../../shared/services/api.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Location } from '../../shared/models/location';
import { Router } from '@angular/router';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { ListViewDialogComponent } from 'src/app/components/list-view-dialog/list-view-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { Subscription } from 'rxjs';

  // tslint:disable: no-string-literal
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  // added a dependency injection in order to use the getLocations method without creating an instance of the object
  constructor(
    private service: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private geolocation: GeolocationService
  ) {}

  zoom = 15;
  center: google.maps.LatLngLiteral;
  geolocationSubscription: Subscription;

  // local property to store the json data from getLocations
  location: Location[] = [];

  filter = [0, 1, 2, 3];

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
    this.geolocationSubscription = this.geolocation.location.subscribe({
      next: (location) => {
        this.center = location;
      },
    });
  }

  ngOnDestroy() {
    this.geolocationSubscription.unsubscribe();
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
          link: location.link,
          position: location.position,
        },
        panelClass: 'app-dialog',
      });
    } else {
      this.infoLocation = location;
      this.infoWindow.open(marker);
    }
  }
}


