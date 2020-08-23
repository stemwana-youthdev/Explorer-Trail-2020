import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl({value: '', disabled: true}),
    region: new FormControl(''),
    homeTown: new FormControl(''),
  });

  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getEmail();
  }

  async getUserInfo() {
    await this.auth.getCurrentUser().then(value =>
      this.user = value
    );
    this.profileForm.get('firstName').setValue(this.user.firstName);
    this.profileForm.get('lastName').setValue(this.user.lastName);
    this.profileForm.get('region').setValue(this.user.region);
    this.profileForm.get('homeTown').setValue(this.user.homeTown);
  }

  async getEmail() {
    const email = await this.auth.currentUserEmail();
    this.profileForm.get('email').setValue(email);
  }

  async onSubmit() {
    this.user.firstName = this.profileForm.get('firstName').value;
    this.user.lastName = this.profileForm.get('lastName').value;
    this.user.region = this.profileForm.get('region').value;
    this.user.homeTown = this.profileForm.get('homeTown').value;
    try {
      await this.auth.updateCurrentUser(this.user);
    }catch (error) {
      console.warn(error);
      return;
    }
    this.snackbar.open('Profile successfully updated', 'Close', {
      duration: 3000
    });
  }

}
