import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProfilePhotoDialogComponent } from '../profile-photo-dialog/profile-photo-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  loggedIn: boolean;
  photoURL: string;
  photoURLSubscription: Subscription;

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled: true}, Validators.required),
    region: new FormControl('', Validators.required),
    homeTown: new FormControl('', Validators.required),
  });

  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.photoURLSubscription = this.auth.photoURL.subscribe((url) => {
      this.photoURL = url;
    });
  }

  ngOnDestroy() {
    this.photoURLSubscription?.unsubscribe();
  }

  async getUserInfo() {
    await this.auth.getCurrentUser().then(value =>
      this.user = value
    );
    this.profileForm.get('firstName').setValue(this.user.firstName);
    this.profileForm.get('lastName').setValue(this.user.lastName);
    this.profileForm.get('region').setValue(this.user.region);
    this.profileForm.get('homeTown').setValue(this.user.homeTown);

    const email = await this.auth.currentUserEmail();
    this.profileForm.get('email').setValue(email);
  }

  editPhoto() {
    this.dialog.open(ProfilePhotoDialogComponent, {
      panelClass: 'app-dialog',
    });
  }

  async onSubmit() {
    const updatedUser = {
      id: this.user.id,
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      region: this.profileForm.get('region').value,
      homeTown: this.profileForm.get('homeTown').value
    };
    try {
      await this.auth.updateCurrentUser(updatedUser);
    }catch (error) {
      console.warn(error);
      return;
    }
    this.snackbar.open('Profile successfully updated', 'Close', {
      duration: 3000
    });
  }

}
