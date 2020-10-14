import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/shared/services/custom-validation.service';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ConfigService } from 'src/app/core/config/config.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  errorMessage = '';
  user: User;
  termsLink: string;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, this.customValidator.validPassword]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: this.customValidator.matchPassword('password', 'confirmPassword') });

  constructor(
    public auth: AuthService,
    private router: Router,
    private customValidator: CustomValidationService,
    private configService: ConfigService,
  ) {
    this.termsLink = this.configService.get('TERMS_LINK');
  }

  get emailError(): boolean {
    return this.registerForm.controls.email.hasError('email')
      && this.registerForm.controls.email.touched;
  }

  get passwordError(): boolean {
    return this.registerForm.controls.password.hasError('invalidPassword')
      && this.registerForm.controls.password.touched;
  }

  get passwordMatchError(): boolean {
    return this.registerForm.controls.confirmPassword.hasError('passwordMismatch')
      && this.registerForm.controls.confirmPassword.touched;
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  navigateToHomepage() {
    this.router.navigate(['/']);
  }

  async onSubmit() {

    this.auth.registerEmail(
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.firstName.value,
      this.registerForm.controls.lastName.value
    ).then(() => {
      this.router.navigate(['/']);
    }).catch(
      (err) => {
        if (err.code === 'auth/email-already-in-use') {
          this.errorMessage = 'This email already has an account.';
        }
        if (err.code === 'auth/invalid-email') {
          this.errorMessage = `Sorry, that doesn't look like a valid email address`;
        }
      }
    );
  }

}
