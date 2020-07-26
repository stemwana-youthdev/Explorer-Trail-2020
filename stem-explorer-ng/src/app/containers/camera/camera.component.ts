import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListViewDialogComponent } from 'src/app/components/list-view-dialog/list-view-dialog.component';
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
      this.snackBar.open('QR code not recognised', null, {
        duration: 5000, // 5000ms
      });
      return;
    }

    const challengeId = parseInt(match[1], 10);
    const challenges = await this.api.getChallenges().toPromise();
    const challenge = challenges.challenges.find((c) => c.uid === challengeId);
    const locations = await this.api.getLocations().toPromise();
    const location = locations.location.find((l) => l.uid === challengeId);

    this.dialog.closeAll();
    this.dialog.open(ListViewDialogComponent, {
      data: {
        challenge,
        name: location?.name,
        link: location?.link,
      },
      panelClass: 'app-dialog',
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

  showError(error: Error) {
    console.error(error);
    this.error = error;
    this.isLoading = false;
  }
}
