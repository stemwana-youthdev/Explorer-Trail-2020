import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Profile } from 'src/app/shared/models/profile';
import { ImageService } from 'src/app/shared/services/image.service';
import { Region } from 'src/app/shared/models/region';
import { ConfigService } from 'src/app/core/config/config.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggedIn: boolean;
  profile: Profile;
  profilePic: any;
  regions: Region[] = [];
  cities: string[] = [];
  termsLink: string;

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled: true}, Validators.required),
    region: new FormControl('', Validators.required),
    homeTown: new FormControl('', Validators.required),
    profilePic: new FormControl(''),
    nickname: new FormControl('')
  });

  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private imageService: ImageService,
    private api: ApiService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.termsLink = this.configService.get('TERMS_LINK');
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.profilePic = this.auth._user.photo;
    this.fetchRegions();
    this.setForm();
  }

  fetchRegions() {
    this.api.getRegions().subscribe((regions) => {
      this.regions = regions;
      this.cities =
        this.regions.find((region) => region.name === this.profile.region)?.cities ?? [];
    });
  }

  regionChange({ value }: { value: string }) {
    this.cities =
      this.regions.find((region) => region.name === value)?.cities ?? [];
    this.profileForm.controls.homeTown.setValue(null);
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
    this.profileForm.controls.nickname.setValue(this.profile.nickname);
  }

  onSubmit(): void {
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
    };

    this.auth.updateProfile(updatedUser, this.profilePic).subscribe(
      () => {
        this.profileForm.markAsPristine();
        this.snackbar.open('Awesome! Profile updated!', 'Close', {
          duration: 3000
        });
      }
    );
  }

  async selectFile(photo) {
    if (photo.target.files && photo.target.files[0]) {
      this.profileForm.controls.profilePic.markAsDirty();
      const file = photo.target.files[0];
      const url = await this.imageService.readAsDataURL(file);
      const unscaled = await this.imageService.loadImage(url);
      const cropped = this.imageService.cropToSquare(unscaled, 40);
      const croppedURL = cropped.toDataURL('image/webp');
      this.profilePic = croppedURL;
    }
  }
}
