import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent {

  constructor(
    private location: Location,
    private router: Router,
  ) { }

  cameraView() {
    this.location.back();
  }

}
