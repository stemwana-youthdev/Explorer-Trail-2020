import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from 'src/app/shared/services/image.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-photo-dialog',
  templateUrl: './profile-photo-dialog.component.html',
  styleUrls: ['./profile-photo-dialog.component.scss']
})
export class ProfilePhotoDialogComponent implements OnInit {

  @ViewChild('imageUpload') imageUpload: ElementRef<HTMLInputElement>;

  constructor(
    private image: ImageService,
    private auth: AuthService,
    private dialog: MatDialogRef<ProfilePhotoDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  async upload() {
    const file = this.imageUpload.nativeElement.files[0];
    const url = await this.image.readAsDataURL(file);
    const unscaled = await this.image.loadImage(url);
    const cropped = this.image.cropToSquare(unscaled, 40);
    const croppedURL = cropped.toDataURL('image/webp');
    await this.auth.updatePhotoURL(croppedURL);
    this.dialog.close();
  }

}
