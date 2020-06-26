import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  title = 'Welcome to the STEM Explorer Trail';
  content = 'welcome content';

  constructor() { }

  ngOnInit(): void {
  }

}
