import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SplashScreenComponent } from '../../components/splash-screen/splash-screen.component';
import { Store } from '@ngxs/store';
import { VisitedHomepage } from 'src/app/store/last-homepage/last-homepage.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private store: Store,
  ) { }

  ngOnInit() {
    /*
    * Uses local storage to see if the user has visited the site before.
    * If they have not the splash screen dialog is displayed.
    */
   const visited = localStorage.getItem('visited');
   if (visited == null) {
     this.dialog.open(SplashScreenComponent, {panelClass: 'app-dialog'});
     localStorage.setItem('visited', 'true');
   }

   this.store.dispatch(new VisitedHomepage());
  }

}
