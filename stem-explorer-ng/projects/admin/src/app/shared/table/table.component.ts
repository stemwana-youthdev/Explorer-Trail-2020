import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class AdminTableComponent implements OnInit {
  displayColumns: any[] = [];

  @Input() dataSource: any[];
  @Input() columns: any[];

  constructor() {}

  ngOnInit() {
    this.setColumns();
  }

  setColumns() {
    this.displayColumns = this.columns.map((x => x.columnDef));
    console.warn('setColumns displayc', this.displayColumns)
    console.warn('setColumns columns', this.columns)
    console.warn('setColumns data', this.dataSource)
  }
}
