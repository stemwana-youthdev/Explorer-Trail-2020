import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent {
  @Input() title: string;
  // @Input() user: any;
  user = {
    name: 'Louie'
  }

  constructor() {}

  openAccountInfo(): void {
    console.warn('This is going to do something one day');
  }
}
