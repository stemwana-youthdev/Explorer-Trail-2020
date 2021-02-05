import { Injectable } from '@angular/core';
import { Table } from '../../app/shared/models/table.model';
import { Admin } from '../admin.model';

@Injectable({ providedIn: 'root' })
export class AdminsTablesFactory {
  constructor() {}

  adminsTable(onDeleteClicked: (item: Admin) => void): Table {
    return {
      columns: [
        {
          columnDef: 'email',
          header: 'Email',
          type: 'text',
        },
        {
          columnDef: '_delete',
          header: '',
          type: 'icon-button',
          icon: 'delete',
          onClick: onDeleteClicked,
        },
      ],
    };
  }
}
