import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '../state/router.state';

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

  constructor(
    private store: Store
  ) {}

  goToPage(path: string) {
    this.store.dispatch([
      new Navigate(path)
    ]);
  }
}
