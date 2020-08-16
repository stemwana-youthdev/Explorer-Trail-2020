import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss']
})
export class LoginEmailComponent implements OnInit {

  emailValue = '';
  passwordValue = '';
  errorMessage = '';

  emailField = 'profile';
  passwordField = 'profile';

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  async login(email: string, password: string) {
    try {
      await this.auth.passwordLogin(email, password);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        this.errorMessage = 'You have entered an invalid email or password. Please try again.';
        this.passwordValue = '';
      } else {
        console.warn(error);
        this.errorMessage = error.message;
      }
      return;
    }
    console.log('successful login');
    this.router.navigateByUrl(
      this.store.selectSnapshot(LastHomepageState.lastHomepage)
    );
  }

}
