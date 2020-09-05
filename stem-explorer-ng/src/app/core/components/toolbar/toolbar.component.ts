import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Profile } from 'src/app/shared/models/profile';
import { User } from 'src/app/shared/models/user';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() drawer: MatDrawer;
  profile: Profile;

  constructor(
    public auth: AuthService,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit() {
    if (this.auth.user$) {
      this.getProfile();
    }
  }

  get photoURL(): string {
    const user: User = JSON.parse(localStorage.getItem('currentUser'));
    return user ? user.photo : null;
  }

  getProfile() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.auth.signOut();
  }

  navigateToHome() {
    this.router.navigate([this.store.selectSnapshot(LastHomepageState.lastHomepage)]);
  }

  navigateToProfile() {
    this.router.navigate(['profile']);
  }

}
