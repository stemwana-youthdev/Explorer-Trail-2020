import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChallengeDialogComponent } from 'src/app/containers/challenge-dialog/challenge-dialog.component';
import { ApiService } from 'src/app/shared/services/api.service';

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
    private api: ApiService
  ) {}

  async scanSuccess(url: string) {
    const regex = /^https?\:\/\/[\w\.]+\/challenge\/(\d+)$/;
    const match = url.match(regex);
    if (!match) {
      this.qrCodeNotRecognized();
      return;
    }

    const challengeId = parseInt(match[1], 10);

    this.dialog.closeAll();
    this.dialog.open(ChallengeDialogComponent, {
      data: { challengeId },
      panelClass: 'app-dialog',
    });
  }

  private qrCodeNotRecognized() {
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
  }

  private showError(error: Error) {
    console.error(error);
    this.error = error;
    this.isLoading = false;
  }
}
