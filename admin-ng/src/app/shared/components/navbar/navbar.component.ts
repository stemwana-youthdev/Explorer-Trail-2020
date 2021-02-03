import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Input() title: string;
  user: firebase.User;
  sub: Subscription;

  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit() {
    this.sub = this.auth.user.subscribe((val) => (this.user = val));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  openAccountInfo(): void {
    this.router.navigateByUrl('/profile');
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }
}
