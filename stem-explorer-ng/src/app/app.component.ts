import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, distinct } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'STEMFest Explorer Trail';

  constructor(
    private router: Router,
  ) { }

  get currentUrl(): Observable<string> {
    return this.router.events.pipe(
      // tslint:disable-next-line:deprecation
      startWith(null),
      map(() => this.router.url),
      distinct(),
    );
  }

  get isMap() {
    return this.currentUrl.pipe(
      map((url) => url === '/'),
    );
  }

  navigateToList() {
    this.router.navigateByUrl('/list-view');
  }

  navigateToMap() {
    this.router.navigateByUrl('/');
  }

}
