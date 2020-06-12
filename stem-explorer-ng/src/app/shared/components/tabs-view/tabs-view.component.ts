import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs-view',
  templateUrl: './tabs-view.component.html',
  styleUrls: ['./tabs-view.component.scss']
})
export class TabsViewComponent implements OnInit {

  navLinks = [
    { path: '', label: 'Map' },
    { path: 'list-view', label: 'List View' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
