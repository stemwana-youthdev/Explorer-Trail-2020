import { MapMarker, MapInfoWindow } from '@angular/google-maps';
import { ApiService } from './../../shared/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '../../shared/models/location';



  // tslint:disable: no-string-literal
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // added a dependency injection in order to use the getLocations method without creating an instance of the object
  constructor(private service: ApiService) {}
  zoom = 15;
  center: google.maps.LatLngLiteral;

  // local property to store the json data from getLocations
  location: Location[] = [];

  filter = [0, 1, 2, 3];


  // controls what function is shown on the map
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 8,
    gestureHandling: 'cooperative' // for gesture controls
  };


  // tslint:disable-next-line: member-ordering
  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
  infoContent = '';

  /**
   * @todo use navigator.location to set this.center to user's current location.
   */
  ngOnInit() {
    // set maps to the center of Tauranga
    this.center = {
      lat: -37.6854709,
      lng: 176.1673285,
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


  challengeTitle = '';
  challengeDescription = ''; // separate property for the html side to show challenge description in a new line

  openInfo(marker: MapMarker, content, content2) {
    this.challengeTitle = `Challenge: ${content}`;
    this.challengeDescription = `Description: ${content2}`; // Text format to display within infoWindow
    this.infoWindow.open(marker);
  }
}


