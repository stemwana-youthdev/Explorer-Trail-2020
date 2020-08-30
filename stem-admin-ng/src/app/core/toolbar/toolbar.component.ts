import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  template: `<mat-toolbar>
      <span>{{ title }}</span>
      <span *ngFor="let link of navLink">
        <span class="nav-link" (click)="clickLink(link.path)">{{ link.label }}</span>
      </span>
      <span class="spacer"></span>
      <span>
        <mat-icon>account_circle</mat-icon>
      </span>
    </mat-toolbar>`,
  styles: ['.nav-link { margin-left: 20px; cursor: pointer }']
})
export class ToolbarComponent {
  title = 'STEM Admin';
  navLink = [
    { label: 'Locations', path: 'locations' },
    { label: 'Challenges', path: '/' },
    { label: 'Levels', path: '/' },
    { label: 'Profiles', path: '/' }
  ];

  constructor(private router: Router) {}

  clickLink(path: string): void {
    this.router.navigate([path]);
  }
}
