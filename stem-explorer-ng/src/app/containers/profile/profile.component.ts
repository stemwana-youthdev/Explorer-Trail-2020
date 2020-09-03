import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth/auth.service';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/shared/models/profile';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggedIn: boolean;
  profile: Profile;

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled: true}, Validators.required),
    region: new FormControl('', Validators.required),
    homeTown: new FormControl('', Validators.required),
    profilePic: new FormControl(''),
    nickname: new FormControl('', Validators.required)
  });

  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getProfile();
    // this.photoURLSubscription = this.auth.photoURL.subscribe((url) => {
    //   this.photoURL = url;
    // });
  }

  ngOnDestroy() {
    // this.photoURLSubscription?.unsubscribe();
  }

  getProfile() {
    this.auth.getProfile().pipe(map(res => {
      this.profile = res;
      this.setForm();
    })).subscribe();
  }

  toMap() {
    this.router.navigate(['/']);
  }

  get errorMessage(): boolean {
    return this.profileForm.dirty && !this.profileForm.valid;
  }

  private setForm() {
    this.profileForm.controls.firstName.setValue(this.profile.firstName);
    this.profileForm.controls.lastName.setValue(this.profile.lastName);
    this.profileForm.controls.email.setValue(this.profile.email);
    this.profileForm.controls.region.setValue(this.profile.region);
    this.profileForm.controls.homeTown.setValue(this.profile.homeTown);
    this.profileForm.controls.profilePic.setValue(this.profile.photoUrl);
    this.profileForm.controls.nickname.setValue(this.profile.nickname);
  }

  editPhoto() {
    // this.dialog.open(ProfilePhotoDialogComponent, {
    //   panelClass: 'app-dialog',
    // });
  }

  async onSubmit() {
    const updatedUser: Profile = {
      id: this.profile.id,
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      region: this.profileForm.get('region').value,
      homeTown: this.profileForm.get('homeTown').value,
      nickname: this.profileForm.get('nickname').value,
      profileCompleted: true,
      userId: this.profile.userId,
      email: this.profile.email,
      photoUrl: this.profileForm.get('profilePic').value
    };

    this.auth.updateProfile(updatedUser).subscribe(
      () => {
        this.profileForm.markAsPristine();
        this.snackbar.open('Awesome! Profile updated!', 'Close', {
          duration: 3000
        });
      }
    );
  }
}
