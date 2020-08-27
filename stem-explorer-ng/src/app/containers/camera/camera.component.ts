import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

class CameraAccessError extends Error {
  constructor() {
    super(`Please check that ${document.title} has access to your camera.`);
  }
}

class CameraNotFoundError extends Error {
  constructor() {
    super('Could not find any cameras.');
  }
}

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
  isLoading = true;
  error?: Error;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private api: ApiService,
    private router: Router,
    private gtmService: GoogleTagManagerService,
  ) {}

  async scanSuccess(url: string) {
    const regex = /^https?\:\/\/[\w\.]+\/challenge\/(\d+)$/;
    const match = url.match(regex);
    if (!match) {
      this.qrCodeNotRecognized();
      return;
    }
    // push to dataLayer
    const gtmTag = {
      event: 'successful QR scan',
  };
    this.gtmService.pushTag(gtmTag);

    const challengeId = parseInt(match[1], 10);

    this.dialog.closeAll();
    this.router.navigate(['challenge/' + challengeId]);
  }

  private qrCodeNotRecognized() {
    // push to dataLayer
    const gtmTag = {
      event: 'unsuccessful QR scan',
  };
    this.gtmService.pushTag(gtmTag);
    this.snackBar.open('QR code not recognised', null, {
      duration: 5000,
    });
  }

  permissionResponse(response: boolean) {
    if (!response) {
      this.showError(new CameraAccessError());
    }
  }

  camerasFound() {
    this.isLoading = false;
  }

  camerasNotFound() {
    this.showError(new CameraNotFoundError());
    // push to dataLayer
    const gtmTag = {
      event: 'camera not found',
  };
    this.gtmService.pushTag(gtmTag);
  }

  private showError(error: Error) {
    console.error(error);
    this.error = error;
    this.isLoading = false;
  }
}
