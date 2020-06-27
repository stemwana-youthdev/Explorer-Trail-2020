import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SplashScreenComponent } from '../../components/splash-screen/splash-screen.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    /*
    * Uses local storage to see if the user has visited the site before.
    * If they have not the splash screen dialog is displayed.
    */
   const visited = localStorage.getItem('visited');
   if (visited == null) {
     this.dialog.open(SplashScreenComponent);
     localStorage.setItem('visited', 'true');
   }
  }

}
