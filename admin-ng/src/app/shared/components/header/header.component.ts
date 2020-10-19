import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavButton } from '../../../shared/models/nav-button.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string;
  @Input() topButtons?: NavButton;

  constructor(private router: Router) {}

  onClick(link: string): void {
    console.warn(link)
    this.router.navigate([link]);
  }
}
