import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  errorMessage = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store,
  ) { }

  async loginWithGoogle() {
    await this.auth.googleAuthLogin();
    this.router.navigateByUrl('');
  }

  navigateToRegister() {
    this.router.navigateByUrl('register');
  }

  async onSubmit() {
    try {
      await this.auth.emailLogin(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      );
    }catch (error) {
      this.errorMessage = error.message;
      return;
    }
    console.log('successful login');
    this.router.navigateByUrl(
      this.store.selectSnapshot(LastHomepageState.lastHomepage)
    );
  }

}
