import { Table } from '../models/table.model';

export class TableFactory {
  contentTable(): Table {
    return {
      columns: [
        {
          columnDef: 'title',
          formatter: 'text',
          header: 'Link Title'
        },
        {
          columnDef: 'url',
          formatter: 'link',
          header: 'URL'
        },
        {
          columnDef: 'order',
          formatter: 'text',
          header: 'Order'
        }
      ]
    };
  }

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
