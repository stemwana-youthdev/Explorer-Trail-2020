import { Injectable, Input } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({ providedIn: 'root' })
export class FormsFactory {
  constructor() {}

  adminForm(): FormlyFieldConfig[] {
    return [
      {
        key: 'email',
        id: 'field_email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Email',
          maxLength: 150,
          required: true,
        },
      },
    ];
  }
}
