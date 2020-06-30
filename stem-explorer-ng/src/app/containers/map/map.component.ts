import { MapMarker, MapInfoWindow } from '@angular/google-maps';
import { ApiService } from './../../shared/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})



export class MapComponent implements OnInit {
  zoom = 15;
  center: google.maps.LatLngLiteral;
  location: any[] = []; //local property to store the json data from getLocations
  challenges: any[] = []; //local property for challenges
  options: google.maps.MapOptions={ //controls what function is shown on the map
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 8,
    gestureHandling: "cooperative" //for gesture controls
  }

  constructor(private service: ApiService) {} 
  //added a dependency injection in order to use the getLocations method without creating an instance of the object

  ngOnInit() {
      this.center = {
        lat: -37.6934845,
        lng: 176.1649924, //set maps to the center of Tauranga
      }
      this.loadLocation();
  }

  loadLocation() {
    this.service.getLocations().subscribe(l => { //uses the ApiService to call on the getLocations method to open a listerning stream to get the data from the json file
      //console.log(l);
      this.location = l['location']; //sotre the data in a local property
    });
  }


  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow
  infoContent = ''

  openInfo(marker: MapMarker, content){
    this.infoContent = 'Challenge: ' + content
    this.infoWindow.open(marker)
  }
}


