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
}
