import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/shared/services/custom-validation.service';
import { Store } from '@ngxs/store';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

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
    private auth: AuthService,
    private router: Router,
    private customValidator: CustomValidationService,
    private store: Store,
  ) { }

  async registerWithGoogle() {
    await this.auth.googleAuthLogin();
    this.router.navigateByUrl('');
  }

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }

  navigateToHomepage() {
    this.router.navigateByUrl('');
  }

  navigateToEmailRegister() {
    this.router.navigateByUrl('email-register');
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        await this.auth.emailRegister(
          this.registerForm.get('email').value,
          this.registerForm.get('password').value
        );
      } catch (error) {
        this.errorMessage = error.message;
        return;
      }
      this.router.navigateByUrl(
      this.store.selectSnapshot(LastHomepageState.lastHomepage)
      );
     }
  }

}
