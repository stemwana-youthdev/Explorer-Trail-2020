import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class AdminTableComponent implements OnInit {
  @Input() dataSource: any[];
  @Input() columns: any[];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor() {}

  ngOnInit() {}
}
