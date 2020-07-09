import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { ExternalContent } from 'src/app/shared/models/external-content';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  @ViewChild('drawer')
  drawer: MatDrawer;

  externalContent: ExternalContent[];

  constructor(
    private router: Router,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.getExternalContent();
  }

  getExternalContent() {
    this.api.getExternalContent().subscribe({
      next: (content) => {
        this.externalContent = content;
        this.externalContent.sort((a, b) => a.order - b.order);
      },
    });
  }

  toggle() {
    this.drawer.toggle();
  }

  navigateToHomepage() {
    this.router.navigateByUrl('');
  }

}
