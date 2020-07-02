import { MapMarker, MapInfoWindow } from '@angular/google-maps';
import { ApiService } from './../../shared/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';

  // tslint:disable: no-string-literal
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  zoom = 15;
  center: google.maps.LatLngLiteral;

  // local property to store the json data from getLocations
  location: any[] = [];
  // controls what function is shown on the map
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 8,
    gestureHandling: 'cooperative' // for gesture controls
  };

  // added a dependency injection in order to use the getLocations method without creating an instance of the object
  constructor(private service: ApiService) {}

  /**
   * @todo use navigator.location to set this.center to user's current location.
   */
  ngOnInit() {
    // set maps to the center of Tauranga
    this.center = {
      lat: -37.6934845,
      lng: 176.1649924,
    };
    this.loadLocation();
  }

  /**
   * uses the ApiService to call on the getLocations method to open a listerning stream to get the data from the json file
   */
  loadLocation() {
    this.service.getLocations().subscribe(l => {
      // store the data in a local property
      this.location = l['location'];
    });
  }


  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow
  infoContent = ''

  openInfo(marker: MapMarker, content){
    this.infoContent = 'Challenge: ' + content
    this.infoWindow.open(marker)
  }
}


