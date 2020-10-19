import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({ providedIn: 'root' })
export class ChallengeFormsFactory {
  stemCategories = [
    { label: 'Science', value: 0 },
    { label: 'Technology', value: 1 },
    { label: 'Engineering', value: 2 },
    { label: 'Mathematics', value: 3 },
  ];

  constructor() {}

  challengeForm(): FormlyFieldConfig[] {
    return [
      {
        key: 'title',
        id: 'field_name',
        type: 'input',
        templateOptions: {
          label: 'Challenge Title',
          maxLength: 150,
          required: true
        }
      },
      {
        key: 'category',
        id: 'field_category',
        type: 'select',
        templateOptions: {
          label: 'Category',
          options: this.stemCategories,
          required: true
        }
      },
      {
        key: 'description',
        id: 'field_desc',
        type: 'textarea',
        templateOptions: {
          label: 'Description',
          required: true
        }
      }
    ];
  }
}
