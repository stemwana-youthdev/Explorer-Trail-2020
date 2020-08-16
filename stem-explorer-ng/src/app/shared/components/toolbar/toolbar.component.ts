import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input()
  drawer: MatDrawer;
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private auth: AuthService,
    private store: Store,
  ) {
    // this.auth.isLoggedIn.pipe(map(res => this.isLoggedIn = res));
  }

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }

  logout() {
    this.auth.signOut();
  }

  navigateToHome() {
    const lastHomepage = this.store.selectSnapshot(LastHomepageState.lastHomepage)
    this.router.navigateByUrl(lastHomepage);
  }

  openDrawer() {
    this.drawer.toggle();
  }
}
