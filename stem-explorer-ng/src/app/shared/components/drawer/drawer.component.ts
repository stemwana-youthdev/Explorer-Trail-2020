import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { ExternalContent } from 'src/app/shared/models/external-content';
import { ApiService } from 'src/app/shared/services/api.service';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';

interface Link {
  title: string;
  url: string;
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
  externalContent: ExternalContent[] = [];

  links: Link[] = [
    {
      title: 'Home',
      home: true,
      url: '/'
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

  constructor(
    private router: Router,
    private api: ApiService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.getExternalContent();
  }

  toggle() {
    this.drawer.toggle();
  }

  navigateTo(link: Link) {
    const lastHomepage = this.store.selectSnapshot(LastHomepageState.lastHomepage);

    this.router.navigateByUrl(link.home ? lastHomepage : link.url);
    this.drawer.close();
  }

  private getExternalContent() {
    this.api.getExternalContent().pipe(
      map(content => {
        this.externalContent = content.sort((a, b) => a.order - b.order);
      })
    ).subscribe();
  }
}
