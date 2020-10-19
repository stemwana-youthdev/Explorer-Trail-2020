import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({ providedIn: 'root' })
export class FormsFactory {
  constructor() {}

  locationForm(): FormlyFieldConfig[] {
    return [
      {
        key: 'name',
        id: 'field_name',
        type: 'input',
        templateOptions: {
          label: 'Location Name',
          maxLength: 150,
          required: true
        }
      },
      {
        key: 'address',
        id: 'field_address',
        type: 'input',
        templateOptions: {
          label: 'Street Address',
          required: true
        }
      },
      {
        className: 'section-header',
        template: '<h3>Location Position</h3>'
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'position.lat',
            id: 'field_lat',
            type: 'input',
            templateOptions: {
              label: 'Latitude',
              maxLength: 50,
              required: true
            }
          },
          {
            key: 'position.lng',
            id: 'field_lng',
            type: 'input',
            templateOptions: {
              label: 'Longitude',
              maxLength: 50,
              required: true
            }
          }
        ]
      },
      {
        key: 'googlePlaceId',
        id: 'field_googleplaceid',
        type: 'input',
        templateOptions: {
          label: 'Google Place ID',
        }
      },
      {
        className: 'field-helper',
        template: 'Get the google place ID <a href="">here</a>'
      },
      {
        className: 'section-header',
        template: '<h3>Contact Details</h3>'
      },
      {
        key: 'email',
        id: 'field_email',
        type: 'input',
        templateOptions: {
          label: 'Email',
          type: 'email'
        }
      },
      {
        key: 'phone',
        id: 'field_phone',
        type: 'input',
        templateOptions: {
          label: 'Phone Number'
        }
      },
      {
        key: 'link',
        id: 'field_link',
        type: 'input',
        templateOptions: {
          label: 'URL'
        }
      },
      {
        key: 'featured',
        id: 'field_featured',
        type: 'checkbox',
        templateOptions: {
          label: 'Is Featured Location',
        }
      }
    ];
  }
}
