import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  center: google.maps.LatLngLiteral;
  location: any[] = []; //local property to store the json data from getLocations
  constructor(private service: ApiService) {} //added a dependency injection in order to use the getLocations method without creating an instance of the object


  ngOnInit() {
    // navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: -37.6934845,
        lng: 176.1649924, //set maps to the center of Tauranga
      }
      this.loadLocation();
    // })
  }
  loadLocation() { //uses the ApiService to call on the getLocations method to open a listening stream to get the data from the json file
    this.service.getLocations().subscribe(l => {
      console.log(l);
      this.location = l['location']; //store the data in a local property
    });
  }
}
