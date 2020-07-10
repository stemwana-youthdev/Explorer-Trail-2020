import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent {

  constructor(
    private router: Router,
  ) { }

}
