import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss']
})
export class RegisterEmailComponent implements OnInit {

  emailValue = '';
  passwordValue = '';
  confirmPasswordValue = '';

  emailField = 'profile';
  passwordField = 'profile';
  confirmField = 'profile';

  constructor() { }

  ngOnInit(): void {
  }

  register(email: string, password: string, confirmPassword: string) {
    if (this.checkEmailFormat(email) && this.checkPasswordFormat(password) && this.checkPasswordMatch(password, confirmPassword)
     && email !== '' && password !== '' && confirmPassword !== '') {
       console.log('successful register');
     } else {
       console.log('error');
     }
  }

  checkEmailFormat(email: string) {
    if (/.+@+.+\.+./.test(email) || email === '') {
      this.emailField = 'profile';
      return true;
    } else {
      this.emailField = 'profile error';
      return false;
    }
  }

  checkPasswordFormat(password: string) {
    // tslint:disable-next-line: max-line-length
    if (/^(?=^.{8,}$)(?=.*?\d.*\d)(?=.*?[A-Z].*[A-Z])(?=.*?[a-z].*[a-z])(?=.*?[!@#$%^&;*()_+}{:'"?/.,].*[!@#$%^&;*()_+}{:'"?/.,])(?!.*\s).*/.test(password)
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
