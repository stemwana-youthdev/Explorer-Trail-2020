import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  errorMessage = '';
  user: User;
  passwordReminderSent = false;
  hideField = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  resetPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    public auth: AuthService,
    private router: Router,
    private store: Store,
  ) { }

  navigateToRegister() {
    this.router.navigate(['register']);
  }

  onSubmit() {
    this.auth.emailLogin(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    ).then(() => {
      this.router.navigate(['/']);
    }
    ).catch(() => {
      this.errorMessage = 'Oops! Your email or password is incorrect.';
    });
  }

  forgotPassword() {
    this.router.navigate(['forgot-password']);
  }

  // Checks if the user has completed their profile and if not navigates to profile page
  async pageNavigate() {
    // await this.auth.getCurrentUser().then(value =>
    //   this.user = value
    // );
    // if (this.user.firstName && this.user.lastName && this.user.region && this.user.homeTown) {
    //   this.router.navigateByUrl(
    //     this.store.selectSnapshot(LastHomepageState.lastHomepage)
    //     );
    // }else {
    //   this.router.navigateByUrl('profile');
    // }
  }
}
