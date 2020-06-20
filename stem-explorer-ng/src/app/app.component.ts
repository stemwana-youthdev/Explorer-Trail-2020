import { Component } from '@angular/core';
import { ConfigService } from './config/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'STEMFest Explorer Trail';

  constructor(
    private configService: ConfigService,
    private router: Router,
  ) { }

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }

}
