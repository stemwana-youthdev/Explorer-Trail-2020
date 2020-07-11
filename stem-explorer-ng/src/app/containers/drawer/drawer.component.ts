import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {

  @ViewChild('drawer')
  drawer: MatDrawer;

  constructor(
    private router: Router,
  ) { }

  toggle() {
    this.drawer.toggle();
  }

  navigateToHomepage() {
    this.router.navigateByUrl('');
  }

}
