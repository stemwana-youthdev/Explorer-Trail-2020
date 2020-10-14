import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Column, Table } from '../../models/table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: any;
  @Input() table: Table;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any[]>;
  displayedColumns = [];
  columns: Column[];

  constructor() {}

  ngOnInit(): void {
    this.setColumns();
    console.warn(this.data)
    this.dataSource = new MatTableDataSource(this.data);
  }

  setColumns(): void {
    this.columns = this.table.columns;
    this.columns.forEach(r => this.displayedColumns.push(r.columnDef));
  }
}
