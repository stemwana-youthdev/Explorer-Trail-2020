import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: firebase.User;
  sub: Subscription;

  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit() {
    this.sub = this.auth.user.subscribe((val) => {
      if (!val) {
        this.router.navigateByUrl('/');
      }
      this.user = val;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  openProfile() {
    open('https://stemexplorertrail.nz/profile', '_blank');
  }

  logOut() {
    this.auth.signOut();
  }
}
