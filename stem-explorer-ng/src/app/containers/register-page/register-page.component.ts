import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  async registerWithGoogle() {
    await this.auth.googleAuthLogin();
    this.router.navigateByUrl('');
  }

}
