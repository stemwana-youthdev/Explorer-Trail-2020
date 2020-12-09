import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { QuestionType } from 'src/app/shared/enums/question-type.enum';
import { Dropdown } from 'src/app/shared/models/dropdown.model';

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
    const startDate = new Date(2020, 10, 1);
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
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'startDate',
            id: 'field_startDate',
            type: 'datepicker',
            templateOptions: {
              label: 'Start Date',
              description: 'Date from when the challenge will become active in the app',
              required: true,
            }
          },
          {
            key: 'endDate',
            id: 'field_endDate',
            type: 'datepicker',
            templateOptions: {
              label: 'End Date',
              description: 'Date from when the challenge will cease to be active in the app'
            }
          }
        ]
      }
    ];
  }

  addLocationForm(dropdown: Dropdown[]): FormlyFieldConfig[] {
    return [
      {
        key: 'locationId',
        id: 'field_location',
        type: 'select',
        templateOptions: {
          options: [{ label: 'None', value: null }, ...dropdown],
          label: 'Select Location for this Challenge',
        },
      },
    ];
  }

  levelForm(): FormlyFieldConfig[] {
    return [
      {
        key: 'questionText',
        id: 'field_question',
        type: 'input',
        templateOptions: {
          label: 'Question Text',
          maxLength: 150,
          required: true,
        },
      },
      {
        key: 'difficulty',
        id: 'field_difficulty',
        type: 'input',
        templateOptions: {
          label: 'Difficulty',
          type: 'number',
          min: 0,
          max: 20,
          step: 1,
          required: true,
        },
      },
      {
        key: 'instructions',
        id: 'field_instructions',
        type: 'textarea',
        templateOptions: {
          label: 'Instructions',
          required: true,
          autosize: false,
          rows: 5,
        },
      },
      {
        key: 'hint',
        id: 'field_hint',
        type: 'input',
        templateOptions: {
          label: 'Hint',
          maxLength: 150,
        },
      },
      {
        key: 'answerType',
        id: 'field_answer_type',
        type: 'select',
        templateOptions: {
          label: 'Answer Type',
          required: true,
          options: [
            {
              value: QuestionType.Multichoice,
              label: 'Multichoice',
            },
            {
              value: QuestionType.Number,
              label: 'Number',
            },
            {
              value: QuestionType.Text,
              label: 'Text',
            },
            {
              value: QuestionType.Contains,
              label: 'Contains',
            },
          ],
        },
      },
    ];
  }
}
