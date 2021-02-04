import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavBarComponent {
  @Input() title: string;

  constructor(private router: Router, public auth: AuthService) {}

  openAccountInfo(): void {
    this.router.navigateByUrl('/profile');
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }
}
