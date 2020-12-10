import { Injectable } from '@angular/core';
import { Table } from '../../app/shared/models/table.model';

@Injectable({ providedIn: 'root' })
export class ExternalContentTablesFactory {
  constructor() {}

  externalContentTable(): Table {
    return {
      columns: [
        {
          columnDef: 'title',
          header: 'Title',
          type: 'text'
        },
        {
          columnDef: 'url',
          header: 'URL',
          type: 'url'
        },
        {
          columnDef: 'order',
          header: 'Order',
          type: 'number'
        }
      ]
    };
  }
}
