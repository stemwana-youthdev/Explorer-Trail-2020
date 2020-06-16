import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.scss']
})
export class NavTabsComponent implements OnInit {

  navLinks = [
    { path: '', label: 'Map' },
    { path: 'list-view', label: 'List View' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
