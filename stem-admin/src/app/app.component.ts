import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from './shared/state/router.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stem-admin';

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
