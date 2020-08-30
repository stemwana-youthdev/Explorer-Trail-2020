import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location.model';
import { LocationsApiService } from '../../services/locations-api.service';
import { map } from 'rxjs/operators';
import { TableFactory } from '../factories/location-table.factory';
import { Table } from '../../../app/shared/models/table.model';

@Component({
  selector: 'app-locations',
  templateUrl: 'locations.component.html',
  styleUrls: ['locations.component.scss'],
  providers: [TableFactory]
})
export class LocationsComponent implements OnInit {
  locations: Location[];
  table: Table = this.tableFactory.locations();

  constructor(
    private api: LocationsApiService,
    private tableFactory: TableFactory
  ) {}

  ngOnInit(): void {
    this.getLocations();
  }

  openLocation(location: Location): void {
    console.warn('Open me!', location)
  }

  private getLocations(): void {
    this.api.getLocations().pipe(
      map(res => this.locations = res)
    ).subscribe();
  }
}
