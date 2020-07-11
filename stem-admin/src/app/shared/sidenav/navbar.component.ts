import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  /**
   * @description array of the navigation links.
   */
  navLink = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Custom Links', path: '/content' },
    { label: 'Locations', path: '/locations' }
  ];

  constructor(private router: Router) {}

  goToPage(path: string) {
    this.router.navigate([path]);
  }
}
