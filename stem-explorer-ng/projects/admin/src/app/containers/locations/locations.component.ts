import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  locations: any[] = [];

  columns: any[] = [{
      columnDef: 'name',
      header: 'Name',
      formatter: 'text'
    },
    {
      columnDef: 'link',
      header: 'Url',
      formatter: 'link'
    },
    {
      columnDef: 'contact',
      header: 'Contact Person',
      formatter: 'text'
    }
  ];

  constructor() {}

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.locations = [
      {
        uid: 1,
        name: 'Basestation',
        position: {
          lat: -37.6865807,
          lng: 176.1649332,
        },
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
        link: 'https://library.tauranga.govt.nz/',
        contact: 'sam'
      }
    ];
  }
}
