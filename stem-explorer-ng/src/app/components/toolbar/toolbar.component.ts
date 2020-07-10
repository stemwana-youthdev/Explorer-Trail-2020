import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/shared/auth/auth.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input()
  drawer: MatDrawer;

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
