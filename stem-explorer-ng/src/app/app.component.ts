import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, distinct } from 'rxjs/operators';
import { CameraComponent } from './containers/camera/camera.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'STEMFest Explorer Trail';

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) { }

  get currentUrl(): Observable<string> {
    return this.router.events.pipe(
      // tslint:disable-next-line:deprecation
      startWith(null),
      map(() => this.router.url),
      distinct(),
    );
  }

  get isHomePage() {
    return this.currentUrl.pipe(
      map((url) => url === '/' || url === '/list-view'),
    );
  }

  get showNavBar() {
    return this.currentUrl.pipe(
      map((url) => !url.startsWith('/admin'))
    );
  }

}
