import { Injectable } from '@angular/core';
import { Table } from '../../app/shared/models/table.model';

@Injectable({ providedIn: 'root' })
export class TablesFactory {
  constructor() {}

  locationsTable(): Table {
    return {
      columns: [
        {
          columnDef: 'name',
          header: 'Location Name',
          type: 'text'
        },
        {
          columnDef: 'position',
          header: 'Has Map Lat/Lng',
          type: 'boolean'
        },
        {
          columnDef: 'googlePlaceId',
          header: 'Has Google Map ID',
          type: 'boolean'
        },
        {
          columnDef: 'challengeCount',
          header: '# Challenges',
          type: 'text'
        },
        {
          columnDef: 'featured',
          header: 'Featured',
          type: 'boolean'
        }
      ]
    };
  }

  locationChallenges(): Table {
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
          type: 'text'
        },
        {
          columnDef: 'levels',
          header: 'Levels',
          type: 'levels'
        }
      ]
    };
  }
}
