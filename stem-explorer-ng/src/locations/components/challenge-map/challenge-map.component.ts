import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { Location } from 'src/app/shared/models/location';

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
  @Output() infoLocationClick = new EventEmitter<any>();
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  private TaurangaLocation = {
    lat: -37.6854709,
    lng: 176.1673285,
  };

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

  private geolocationWatchId: number;

  private icons = {
    [Categories.Science]: '/assets/icons/MAP-light-green-point.svg',
    [Categories.Technology]: '/assets/icons/MAP-light-blue-point.svg',
    [Categories.Engineering]: '/assets/icons/MAP-light-orange-point.svg',
    [Categories.Maths]: '/assets/icons/MAP-purple-point.svg',
  };

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
}
