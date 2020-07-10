import { Table } from '../models/table.model';

/**
 * All new tables should have a table factory method within Table Factory.
 */
export class TableFactory {

  /**
   * Custom content for the menu nav links
   */
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

  /**
   * Locations
   */
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
