import { Component, OnInit } from '@angular/core';
import { TableFactory } from '../../../shared/factories/table.factory';
import { Table } from '../../../shared/models/table.model';
import { Location } from '../../../shared/models/location.model';
import { MatDialog } from '@angular/material/dialog';
import { LocationItemComponent } from '../location-item/location-item.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  providers: [TableFactory]
})
export class LocationsComponent implements OnInit {
  locations: Location[] = [];
  table: Table = this.tableFactory.locationsTable();

  constructor(
    readonly tableFactory: TableFactory,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getLocations();
  }

  openDialog(row): void {
    const dialogRef = this.dialog.open(LocationItemComponent, {
      width: '500px',
      data: row
    });

    dialogRef.afterClosed().subscribe(res => {
      console.warn(res)
    });
  }

  private getLocations(): void {
    this.locations = [
      {
        uid: 1,
        name: 'Basestation',
        position: {
          lat: -37.6865807,
          lng: 176.1649332,
        },
        placeId: '',
        link: 'https://www.basestation.nz/en',
        contact: 'Pascale'
      },
      {
        uid: 2,
        name: 'Trustpower',
        position: {
          lat: -37.6857656,
          lng: 176.1679695,
        },
        placeId: '',
        link: 'https://www.trustpower.co.nz/',
        contact: 'Bob'
      },
      {
        uid: 3,
        name: 'i-SITE',
        position: {
          lat: -37.6855958,
          lng: 176.1690853,
        },
        placeId: '',
        link: 'https://www.newzealand.com/in/plan/business/tauranga-i-site-visitor-information-centre/',
        contact: 'steve'
      },
      {
        uid: 4,
        name: 'Tauranga City Library',
        position: {
          lat: -37.6845175,
          lng: 176.1678085,
        },
        placeId: '',
        link: 'https://library.tauranga.govt.nz/',
        contact: 'sam'
      }
    ];
  }
}
