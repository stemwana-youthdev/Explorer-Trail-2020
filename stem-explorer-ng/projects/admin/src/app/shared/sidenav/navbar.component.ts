import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class AdminNavbarComponent {
  navLink = [
    { label: 'Dashboard', path: 'dashboard' },
    { label: 'Locations', path: 'locations' }
  ];

  constructor(private router: Router) {}

  goToPage(path: string) {
    console.warn(path);
    this.router.navigate([path]);
  }
}
