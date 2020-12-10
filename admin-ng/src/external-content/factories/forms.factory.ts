import { Injectable, Input } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({ providedIn: 'root' })
export class FormsFactory {
  constructor() {}

  locationForm(): FormlyFieldConfig[] {
    return [
      {
        key: 'title',
        id: 'field_title',
        type: 'input',
        templateOptions: {
          label: 'Title',
          maxLength: 150,
          required: true,
        },
      },
      {
        key: 'url',
        id: 'field_url',
        type: 'input',
        templateOptions: {
          label: 'URL',
          type: 'url',
          required: true,
        },
      },
      {
        key: 'order',
        id: 'field_order',
        type: 'input',
        templateOptions: {
          label: 'Order',
          type: 'number',
          required: true,
        },
      },
    ];
  }
}
