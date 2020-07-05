import { Component } from '@angular/core';
import { Location } from '../../../shared/models/location.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss']
})
export class LocationItemComponent {
  location: Location;
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[];

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

  constructForm() {
    
  }
}
