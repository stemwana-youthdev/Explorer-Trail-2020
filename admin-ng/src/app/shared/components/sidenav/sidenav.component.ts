import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavLinks } from '../../models/nav-links.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  links: NavLinks[] = [
    {
      label: '',
      url: '',
      icon: '',
    },
  ];

  constructor(private router: Router) {}

  linkClick(link: string) {
    return this.router.navigate([link]);
  }
}
