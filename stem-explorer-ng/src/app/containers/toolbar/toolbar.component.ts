import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';

import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  @Input()
  drawer: MatDrawer;

  photoURL: string;
  photoURLSubscription: Subscription;

  constructor(
    private router: Router,
    private auth: AuthService,
    private store: Store,
  ) { }

  ngOnInit() {
    this.photoURLSubscription = this.auth.photoURL.subscribe((url) => {
      this.photoURL = url;
    });
  }

  ngOnDestroy() {
    this.photoURLSubscription?.unsubscribe();
  }

  get isLoggedIn(): Observable<boolean> {
    return this.auth.isLoggedIn;
  }

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

  navigateToProfile() {
    this.router.navigateByUrl('profile');
  }

}
