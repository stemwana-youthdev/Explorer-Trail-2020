import { Table } from '../models/table.model';

export class TableFactory {
  locationsTable(): Table {
    return {
      columns: [
        {
          columnDef: 'name',
          formatter: 'text',
          header: 'Name'
        },
        {
          columnDef: 'link',
          formatter: 'link',
          header: 'URL'
        },
        {
          columnDef: 'contact',
          formatter: 'text',
          header: 'Contact'
        }
      ]
    };
  }
}
