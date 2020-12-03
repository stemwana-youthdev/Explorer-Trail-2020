import { Component } from '@angular/core';

interface Link {
  link: string[];
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  links: Link[] = [
    { link: ['/locations'], name: 'Locations' },
    { link: ['/challenges'], name: 'Challenges' },
  ];
}
