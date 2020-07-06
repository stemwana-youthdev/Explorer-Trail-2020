import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, distinct } from 'rxjs/operators';

import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'STEMFest Explorer Trail';
  camera = false;

  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  get currentUrl(): Observable<string> {
    return this.router.events.pipe(
      // tslint:disable-next-line:deprecation
      startWith(null),
      map(() => this.router.url),
      distinct(),
    );
  }

  get isHomePage() {
    return this.currentUrl.pipe(
      map((url) => url === '/' || url === '/list-view'),
    );
  }

  get showNavBar() {
    return this.currentUrl.pipe(
      map((url) => url !== '/camera' && !url.startsWith('/admin'))
    );
  }

  get isLoggedIn(): Observable<boolean> {
    return this.auth.isLoggedIn;
  }

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }

  logout() {
    this.auth.logout();
  }

  cameraView() {
    this.camera = !this.camera;
  }

}
