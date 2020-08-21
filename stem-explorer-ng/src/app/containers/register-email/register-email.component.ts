import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Store } from '@ngxs/store';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidationService } from 'src/app/shared/services/custom-validation.service';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss']
})
export class RegisterEmailComponent {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    // tslint:disable-next-line: max-line-length
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])|(?=.*\d)(?=.*[!@#$%^&;*()_+}{:'"?/.,])|(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[!@#$%^&;*()_+}{:'"?/.,])|(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{:'"?/.,])/)]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: this.customValidator.matchPassword('password', 'confirmPassword') });

  errorMessage = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private store: Store,
    private customValidator: CustomValidationService,
    ) { }

  get lastHomepage() {
    return this.store.selectSnapshot(LastHomepageState.lastHomepage);
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      /*
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
      */
      console.log('successful register');
      this.router.navigateByUrl(this.lastHomepage);
     }
  }
}
