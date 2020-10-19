import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavButton } from '../../../app/shared/models/nav-button.model';
import { Table } from '../../../app/shared/models/table.model';
import { TablesFactory } from '../../factories/tables.factory';
import { ApiService } from '../../../app/shared/services/api.service';
import { Location } from '../../../app/shared/models/locations.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  providers: [ TablesFactory ]
})
export class LocationsComponent implements OnInit {
  locations: Location[];
  table: Table;

  topButtons: NavButton[] = [
    {
      label: 'Add Location',
      link: 'locations/create',
      colour: 'pink'
    }
  ];

  constructor(
    private api: ApiService,
    readonly tableFactory: TablesFactory,
    private router: Router
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

  openLocation(location: Location): any {
    console.warn(location);
    return this.router.navigate([`locations/${location.id}`]);
  }
}
