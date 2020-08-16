import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Store } from '@ngxs/store';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss']
})
export class RegisterEmailComponent implements OnInit {

  emailValue = '';
  firstNameValue = '';
  lastNameValue = '';
  passwordValue = '';
  confirmPasswordValue = '';

  emailField = 'profile';
  passwordField = 'profile';
  confirmField = 'profile';

  errorMessage = '';

  tests = [/(?=.*\d)/, /(?=.*[a-z])/, /(?=.*[A-Z])/, /(?=.*[!@#$%^&;*()_+}{:'"?/.,])/];
  passCounter = 0;

  constructor(
    private router: Router,
    private auth: AuthService,
    private store: Store
    ) { }

  get lastHomepage() {
    return this.store.selectSnapshot(LastHomepageState.lastHomepage);
  }

  ngOnInit(): void {
  }

  async register(email: string, password: string, confirmPassword: string) {
    if (this.checkEmailFormat(email) && this.checkPasswordFormat(password) && this.checkPasswordMatch(password, confirmPassword)
     && email !== '' && password !== '' && confirmPassword !== '' && this.firstNameValue !== '' && this.lastNameValue !== '') {
      try {
        await this.auth.passwordRegister(email, password, this.firstNameValue, this.lastNameValue);
      } catch (error) {
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          this.errorMessage = 'Email already in use. Please try again.';
          this.emailValue = '';
        } else {
          console.warn(error);
          this.errorMessage = error.message;
        }
        return;
      }
      console.log('successful register');
      this.router.navigateByUrl(this.lastHomepage);
     } else {
      this.errorMessage = `Please ensure all fields are filled in and
       your password contains at least 2 of upper case, lower case, number or special character.`;
     }
  }

  checkEmailFormat(email: string) {
    if (/^.+@+.+\.+.+$/.test(email) || email === '') {
      this.emailField = 'profile';
      return true;
    } else {
      this.emailField = 'profile error';
      return false;
    }
  }

  checkPasswordFormat(password: string) {
    this.passCounter = 0;
    this.tests.forEach(test => {
      if (test.test(password)) {
        this.passCounter++;
      }
    });

    if ((this.passCounter >= 2 && /.{8,}/.test(password))
     || password === '') {
      this.passwordField = 'profile';
      return true;
    } else {
      this.passwordField = 'profile error';
      return false;
    }
  }

  checkPasswordMatch(password: string, confirmPassword: string) {
    if (password === confirmPassword || confirmPassword === '') {
      this.confirmField = 'profile';
      return true;
    } else {
      this.confirmField = 'profile error';
      return false;
    }
  }

}
