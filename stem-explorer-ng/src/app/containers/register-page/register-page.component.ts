import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  constructor(private authService: AuthService) { }

  registerWithGoogle() {
    this.authService.googleAuthLogin();
  }

}
