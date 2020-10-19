import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin-ng';
  links = [
    { label: 'Locations', path: 'locations' },
    { label: 'Challenges', path: 'challenges' },
  ];

  constructor(private router: Router) {}

  navLink(path: string): any {
    return this.router.navigate([path]);
  }
}
