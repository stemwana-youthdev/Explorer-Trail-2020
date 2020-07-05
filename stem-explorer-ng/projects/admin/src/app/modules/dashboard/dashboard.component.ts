import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  count: any [] = [];

  constructor() {}

  ngOnInit() {
    this.getCount();
  }

  /**
   * @todo add service call to get count.
   */
  getCount() {
    this.count = [
      { label: 'Business', count: 4 }, { label: 'challenges', count: 7 }, { label: 'profiles', count: 20 }
    ];
  }
}
