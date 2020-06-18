import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  center: google.maps.LatLngLiteral;
  location: any[] = [];
  constructor(private service: ApiService) {}


  ngOnInit() {
    // navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: -37.6934845,
        lng: 176.1649924,
      }
      this.loadLocation();
    // })
  }
  loadLocation() {
    this.service.getLocations().subscribe(l => {
      console.log(l);
      this.location = l['location'];
    });
  }
}
