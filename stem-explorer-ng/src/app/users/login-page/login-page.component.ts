import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  async loginWithGoogle() {
    await this.auth.googleSignin();
    this.router.navigateByUrl('');
  }

  navigateToRegister() {
    this.router.navigateByUrl('register');
  }

  navigateToHomepage() {
    this.router.navigateByUrl('');
  }

}
