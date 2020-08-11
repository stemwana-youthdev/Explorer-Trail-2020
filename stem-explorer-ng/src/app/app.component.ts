import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, distinct } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgIcon } from './shared/enums/icons.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'STEMFest Explorer Trail';

  constructor(
    private router: Router,
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ) {
    registerIcons(matIconRegistry, domSanitizer);
  }

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

function registerIcons(
  matIconRegistry: MatIconRegistry,
  domSanitizer: DomSanitizer
) {
  const iconArr: { name: SvgIcon; file: string }[] = [
    { name: 'FILTER-S' , file: 'FILTER-S.svg'},
    { name: 'FILTER-T' , file: 'FILTER-T'},
    { name: 'FILTER-E' , file: 'FILTER-E'},
    { name: 'FILTER-M', file: 'FILTER-M.svg'},
    { name: 'STEM-beaker', file: 'STEM-beaker.svg'},
    { name: 'STEM-Nut', file: 'STEM-Nut.svg'},
    { name: 'STEM-plus-sign', file: 'STEM-plus-sign.svg'},
    { name: 'STEM-robot', file: 'STEM-robot.svg'},
    { name: 'QR-Code' , file: 'QR-Code.svg'},
    { name: 'MAP-light-blue-point' , file: 'MAP-light-blue-point.svg'},
    { name: 'MAP-light-green-point' , file: 'MAP-light-green-point.svg'},
    { name: 'MAP-light-orange-point' , file: 'MAP-light-orange-point.svg'},
    { name: 'MAP-purple-point' , file: 'MAP-purple-point.svg'},
    { name: 'MAP-red-point' , file: 'MAP-red-point.svg'},
    { name: 'AMEN-food' , file: 'AMEN-food.svg'},
    { name: 'AMEN-magnifying-glass' , file: 'AMEN-magnifying-glass.svg'},
    { name: 'AMEN-mail' , file: 'AMEN-mail.svg'},
    { name: 'AMEN-phone' , file: 'AMEN-phone.svg'},
    { name: 'AMEN-toilet' , file: 'AMEN-toilet.svg'},
    { name: 'AMEN-water-refill' , file: 'AMEN-water-refill.svg'},
    { name: 'AMEN-wheelchair' , file: 'AMEN-wheelchair.svg'},
    { name: 'AMEN-wifi' , file: 'wifi-food.svg'},
  ];

  iconArr.forEach(item => {
    matIconRegistry.addSvgIcon(
      item.name,
      domSanitizer.bypassSecurityTrustResourceUrl(
        `app/../assets/icons/${item.file}`
      )
    );
  });
}
