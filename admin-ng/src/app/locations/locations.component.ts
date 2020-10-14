import { Component, OnInit } from '@angular/core';
import { TablesFactory } from '../shared/factories/tables.factory';
import { Location } from '../shared/models/locations.model';
import { Table } from '../shared/models/table.model';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  providers: [ TablesFactory ]
})
export class LocationsComponent implements OnInit {
  locations: Location[];
  table: Table;

  constructor(
    private api: ApiService,
    readonly tableFactory: TablesFactory
  ) {
    this.table = this.tableFactory.locationsTable();
  }

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this.api.getLocations().subscribe(res => {
      console.warn(res);
      this.locations = res;
    });
  }
}
