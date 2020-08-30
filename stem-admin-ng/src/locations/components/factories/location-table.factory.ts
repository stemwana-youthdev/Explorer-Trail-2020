import { Injectable } from '@angular/core';
import { Table } from '../../../app/shared/models/table.model';

@Injectable({ providedIn: 'root' })
export class TableFactory {

  locations(): Table {
    return {
      columns: [
        {
          columnDef: 'name',
          formatter: 'text',
          header: 'Location Name'
        },
        {
          columnDef: 'challengeCount',
          formatter: 'text',
          header: 'No. of Challenges'
        },
        {
          columnDef: 'contactPerson',
          formatter: 'text',
          header: 'Contact'
        },
        {
          columnDef: 'showOnMap',
          formatter: 'showOnMap',
          header: 'View on Map'
        },
        {
          columnDef: 'link',
          formatter: 'link',
          header: 'URL'
        },
      ]
    };
  }
}
