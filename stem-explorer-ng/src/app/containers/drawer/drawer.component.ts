import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { ApiService } from 'src/app/shared/services/api.service';
import { ExternalContent } from 'src/app/shared/models/external-content';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';

interface Link {
  title: string;
  url?: string;
  home?: boolean;
}

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  @ViewChild('drawer')
  drawer: MatDrawer;

  links: Link[] = [
    {
      title: 'Home',
      home: true,
    },
    {
      title: 'About the App',
      url: '/',
    },
    {
      title: 'Featured Retailers',
      url: '/',
    },
    {
      title: 'Contact Us',
      url: '/',
    },
  ];

  externalContent: ExternalContent[];

  constructor(
    private router: Router,
    private api: ApiService,
    private store: Store,
  ) { }

  ngOnInit() {
    this.getExternalContent();
  }

  getExternalContent() {
    this.api.getExternalContent().subscribe({
      next: (content) => {
        this.externalContent = content;
      },
    });
  }

  toggle() {
    this.drawer.toggle();
  }

  get lastHomepage() {
    return this.store.selectSnapshot(LastHomepageState.lastHomepage);
  }

  navigateTo(link: Link) {
    let url = link.url ?? '/';
    if (link.home) {
      url = this.lastHomepage;
    }
    this.router.navigateByUrl(url);
    this.drawer.close();
  }
}
