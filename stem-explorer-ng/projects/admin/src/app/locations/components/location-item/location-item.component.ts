import { Component } from '@angular/core';
import { Location } from '../../../shared/models/location.model';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss']
})
export class LocationItemComponent {
  location: Location;

  constructor() {}

  getLocation() {
    this.location = {
      uid: 1,
      name: 'Basestation',
      position: {
        lat: -37.6865807,
        lng: 176.1649332,
      },
      link: 'https://www.basestation.nz/en',
      contact: 'Pascale'
    };
  }
}
