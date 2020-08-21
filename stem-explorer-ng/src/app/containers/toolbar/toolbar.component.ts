import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';

import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input()
  drawer: MatDrawer;

  get isLoggedIn() {
    return this.auth.isLoggedIn$;
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private store: Store,
  ) { }

  get lastHomepage() {
    return this.store.selectSnapshot(LastHomepageState.lastHomepage);
  }

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }

  logout() {
    this.auth.logout();
  }

  navigateToHome() {
    this.router.navigateByUrl(this.lastHomepage);
  }

}
