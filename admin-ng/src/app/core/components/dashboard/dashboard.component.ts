import { Component } from '@angular/core';

interface Link {
  href: string;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  links: Link[] = [
    { href: '/locations', name: 'Locations' },
    { href: '/challenges', name: 'Challenges' },
  ];
}
