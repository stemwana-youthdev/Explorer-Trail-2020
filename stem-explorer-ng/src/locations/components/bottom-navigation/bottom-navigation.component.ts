import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  template: `
    <button mat-fab class="left" (click)="leftNav()">
      <mat-icon>{{ leftIcon }}</mat-icon>
    </button>
    <button mat-fab class="right" (click)="openCamera()">
      <mat-icon svgIcon="QR-Code"></mat-icon>
    </button>
  `,
  styleUrls: ['bottom-navigation.component.scss']
})
export class BottomNavComponent {
  @Input() leftIcon: string;
  @Input() leftRoute: string;

  constructor(private router: Router) {}

  openCamera() {
    this.router.navigate(['camera']);
  }

  leftNav() {
    this.router.navigate([this.leftRoute]);
  }
}
