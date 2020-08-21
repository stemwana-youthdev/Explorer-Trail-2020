import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { MapMarker, MapInfoWindow } from '@angular/google-maps';

import { Location } from '../../shared/models/location';
import { Categories } from '../../shared/enums/categories.enum';

export interface InfoLocationClickEvent {
  location: Location;
  marker: MapMarker;
}


@Component({
  selector: 'app-challenge-map',
  templateUrl: './challenge-map.component.html',
  styleUrls: ['./challenge-map.component.scss']
})
export class ChallengeMapComponent implements OnInit, OnDestroy {
  @Input() locations: Location[] = [];
  @Input() filter: number[];
  @Input() watchGeolocation = false;

  @Output() challengeLocationClick = new EventEmitter<Location>();
  @Output() infoLocationClick = new EventEmitter<InfoLocationClickEvent>();

  private TaurangaLocation = {
    lat: -37.6854709,
    lng: 176.1673285,
  };


  locationAccess = false;

  zoom = 15;
  // Tauranga
  center: google.maps.LatLngLiteral = this.TaurangaLocation;

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
        featureType: 'transit',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  private geolocationWatchId: number;

  private icons = {
    userLocationMarker:  '/assets/icons/personMarker.png',
    [Categories.Science]: '/assets/icons/map-marker-green.svg',
    [Categories.Technology]: '/assets/icons/map-marker-blue.svg',
    [Categories.Engineering]: '/assets/icons/map-marker-orange.svg',
    [Categories.Maths]: '/assets/icons/map-marker-purple.svg',
  };

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  constructor() { }

  ngOnInit(): void {
    if (this.watchGeolocation) {
      this.loadGeolocation();
    }
  }

  ngOnDestroy() {
    navigator.geolocation?.clearWatch(this.geolocationWatchId);
  }

  private loadGeolocation() {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      return;
    }

    this.locationAccess = true;

    this.geolocationWatchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.center = {
        lat: latitude,
        lng: longitude,
      };
    });
  }

  onLocationClick(marker: MapMarker, location: Location) {
    if (location.challengeId) {
      this.challengeLocationClick.emit(location);
    } else {
      this.infoLocationClick.emit({ location, marker });
    }
  }

  getMarkerOptions(location: Location): google.maps.MarkerOptions {
    return {
      icon: {
        url: this.icons[location.category],
        scaledSize: new google.maps.Size(30, 48),
      }
    };
  }

  userMarkerPoint() {
    return {
      icon: {
        url: '/assets/icons/personMarker.png',
        position: this.center,
      }
    }
  }



  public openInfoLocation(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

}
