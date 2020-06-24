import { Component, OnInit, Input } from '@angular/core';
import { Columns, Table } from '../models/table.model';

@Component({
  selector: 'app-admin-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class AdminTableComponent implements OnInit {
  displayedColumns: string[] = [];
  columns: Columns[] = [];

  @Input() dataSource: any[];
  @Input() table: Table;

  constructor() {}

  ngOnInit() {
    this.setColumns();
  }

  /**
   * gets the columns from the table input; this is done in this component so we get the
   * whole table object incase there are other properties to add.
   * sets all the columnDef as an array of strings to displayedColumns.
   */
  private setColumns() {
    this.columns = this.table.columns;
    this.displayedColumns = this.columns.map((x => x.columnDef));
  }
}
