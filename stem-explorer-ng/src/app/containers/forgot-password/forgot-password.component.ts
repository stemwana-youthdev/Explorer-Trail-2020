import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  errorMessage = '';
  emailSent = false;

  forgotPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  toLogin(): void {
    this.router.navigate(['login']);
  }

  toMap(): void {
    this.router.navigate(['/']);
  }

  resetPassword() {
    this.auth.forgotPassword(this.forgotPassword.controls.email.value).then(
      () => {
        this.emailSent = true;
      }
    ).catch(
      (error) => {
        this.errorMessage = `Sorry, we don't recognise that email address.`;
        console.warn(error);
      }
    );
  }
}
