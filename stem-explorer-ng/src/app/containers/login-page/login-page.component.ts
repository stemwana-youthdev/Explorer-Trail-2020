import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(
    private router: Router,
  ) { }

  loginWithGoogle() {
    // TODO: Show login dialog
    console.warn('Not implemented');
  }

  navigateToRegister() {
    // TODO: Navigate to register page
    console.warn('Not implemented');
  }

  navigateToHomepage() {
    this.router.navigateByUrl('');
  }

}
