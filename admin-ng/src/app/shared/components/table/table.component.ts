import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Column, Table } from '../../models/table.model';
import { Categories } from '../../models/categories.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: any;
  @Input() table: Table;
  @Input() selectable: boolean;
  @ViewChild(MatSort) sort: MatSort;
  @Output() selectRow = new EventEmitter<any>();

  displayedColumns = [];
  columns: Column[];
  Categories = Categories;

  get dataSource(): MatTableDataSource<any[]> {
    return new MatTableDataSource(this.data);
  }

  constructor() {}

  ngOnInit(): void {
    this.setColumns();
  }

  setColumns(): void {
    this.columns = this.table.columns;
    this.columns.forEach(r => this.displayedColumns.push(r.columnDef));
  }

  clickRow(event): void {
    this.selectRow.emit(event);
  }
}
