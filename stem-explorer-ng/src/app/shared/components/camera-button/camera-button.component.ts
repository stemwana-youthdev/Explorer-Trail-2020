import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CameraComponent } from '../camera/camera.component';

@Component({
  selector: 'app-camera-button',
  templateUrl: './camera-button.component.html',
  styleUrls: ['./camera-button.component.scss']
})
export class CameraButtonComponent {

  constructor(
    private dialog: MatDialog,
  ) { }

  cameraView() {
    this.dialog.open(CameraComponent, {
      panelClass: 'fullscreen-dialog',
    });
  }

}
