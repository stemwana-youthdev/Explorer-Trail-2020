import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent {
  Levels: any = Levels;
  cssClass: string;
  loggedIn: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public auth: AuthService,
    private router: Router,
    private store: Store,
  ) {
    this.cssClass = `inverted ${this.data.isCorrect ? StemColours[this.data.category] : 'pink'}`;
  }

  toHome() {
    this.router.navigate(
      [this.store.selectSnapshot(LastHomepageState.lastHomepage)]
    );
  }

  toLogin() {
    this.router.navigate(['/login']);
  }
}
