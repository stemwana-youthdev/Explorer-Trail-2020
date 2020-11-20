import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavLinks } from '../../constants/nav-links.constant';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SideNavComponent {
  links = NavLinks;

  constructor(private router: Router) {
  }

  navClick(path: string): Promise<boolean> {
    return this.router.navigate([path]);
  }
}
