import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Column, Table } from '../models/table.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [];
  columns: Column[];
  _dataSource = new MatTableDataSource();

  @Input()
  get dataSource(): MatTableDataSource<any> {
    return this._dataSource;
  }
  set dataSource(value) {
    this._dataSource = value;
  }

  @Input() table: Table;
  @Output() selectRow = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.setColumns();
    // this.dataSource.paginator = this.paginator
  }

  clickRow(row): void {
    this.selectRow.emit(row);
  }

  private setColumns(): void {
    this.columns = this.table.columns;
    this.displayedColumns = this.columns.map(x => x.columnDef);
  }
}
