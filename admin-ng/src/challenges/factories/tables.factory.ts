import { Injectable } from '@angular/core';
import { Table } from 'src/app/shared/models/table.model';

@Injectable({ providedIn: 'root' })
export class ChallengesTablesFactory {
  constructor() {}

  challengesTable(): Table {
    return {
      columns: [
        {
          columnDef: 'title',
          header: 'Title',
          type: 'text'
        },
        {
          columnDef: 'category',
          header: 'Category',
          type: 'category'
        },
        {
          columnDef: 'description',
          header: 'Description',
          type: 'short-text'
        }
      ]
    };
  }

  selectLocationTable(): Table {
    return {
      columns: [
        {
          columnDef: 'name',
          header: 'Location Name',
          type: 'text'
        },
        {
          columnDef: 'position',
          header: 'Will show on map',
          type: 'boolean'
        },
        {
          columnDef: 'challengeCount',
          header: '# of challenges',
          type: 'text'
        },
        {
          columnDef: 'goToLocation',
          header: 'View Location Detail',
          type: 'link'
        },
        {
          columnDef: 'select',
          header: 'Select Location',
          type: 'checkbox'
        }
      ]
    };
  }
}
