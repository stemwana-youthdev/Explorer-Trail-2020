import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'STEMFest Explorer Trail';

  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  get isLoggedIn(): Observable<boolean> {
    return this.auth.isLoggedIn;
  }

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }

  logout() {
    this.auth.logout();
  }

}
