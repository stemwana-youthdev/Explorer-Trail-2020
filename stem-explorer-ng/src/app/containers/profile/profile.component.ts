import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/auth/auth.service';
import { map } from 'rxjs/operators';
import { Profile } from 'src/app/shared/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  loggedIn: boolean;
  profile: Profile;

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
  ) { }

  ngOnInit(): void {
    // this.getUserInfo();
    this.getProfile();
  }

  getProfile() {
    this.auth.getProfile().pipe(map(res => {
      console.warn(res)
    })).subscribe();
  }

  // getUserInfo() {
  //   this.auth.user$.pipe(
  //     map(res => {
  //       console.warn(res)
  //       this.user = res
        
  //     })
  //   ).subscribe();
  // }

  private setForm(profile: Profile) {
    this.profileForm.controls.firstName.setValue(profile.firstName);
    this.profileForm.controls.lastName.setValue(profile.lastName);
    this.profileForm.controls.email.setValue(profile.email);
    this.profileForm.controls.region.setValue(profile.region);
    this.profileForm.controls.homeTown.setValue(profile.homeTown);
  }

  async onSubmit() {
    // const updatedUser = {
    //   id: this.user.id,
    //   firstName: this.profileForm.get('firstName').value,
    //   lastName: this.profileForm.get('lastName').value,
    //   region: this.profileForm.get('region').value,
    //   homeTown: this.profileForm.get('homeTown').value
    // };
    // try {
    //   await this.auth.updateCurrentUser(updatedUser);
    // }catch (error) {
    //   console.warn(error);
    //   return;
    // }
    // this.snackbar.open('Profile successfully updated', 'Close', {
    //   duration: 3000
    // });
  }
}
