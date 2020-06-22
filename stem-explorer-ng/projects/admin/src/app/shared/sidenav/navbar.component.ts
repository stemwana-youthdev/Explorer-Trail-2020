import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class AdminNavbarComponent {
  navLink = [
    { label: 'Dashboard', path: 'dashboard' }
  ];

  constructor() {}

  goToPage(path: string) {
    console.warn(path);
  }
}
