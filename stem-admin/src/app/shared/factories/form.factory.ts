import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Injectable } from '@angular/core';

@Injectable()
export class FormFactory {
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];

  constructor() {}

  locationsForm(data) {
    this.model = data;
    this.fields = [
      {
        key: 'name',
        id: 'field_location_name',
        type: 'input',
        templateOptions: {
          label: 'Location Name',
          required: true
        }
      },
      {
        key: 'address',
        id: 'field_location_address',
        type: 'input',
        templateOptions: {
          label: 'Address',
          required: true
        }
      },
      {
        key: 'contact',
        id: 'field_location_contact_name',
        type: 'input',
        templateOptions: {
          label: 'Contact Name',
          required: true
        }
      }
    ];
  }
}
