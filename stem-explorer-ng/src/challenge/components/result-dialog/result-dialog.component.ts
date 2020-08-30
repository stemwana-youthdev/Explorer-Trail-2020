import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';
import { Categories } from 'src/app/shared/enums/categories.enum';

export interface ResultDialogData {
  difficulty: number;
  title: string;
  category: number;
  isCorrect: boolean;
  hasNext: boolean;
}

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent {
  Levels: any = Levels;
  cssClass: string;
  loggedIn: boolean;
  Category = Categories;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResultDialogData,
    public auth: AuthService,
    private router: Router,
    private store: Store,
  ) {
    this.cssClass = `inverted ${this.data.isCorrect ? StemColours[this.data.category] : 'pink'}`;
  }

  /**
   * Navigate to home
   */
  toHome(): void {
    this.router.navigateByUrl(
      this.store.selectSnapshot(LastHomepageState.lastHomepage)
    );
  }

  /**
   * Navigate to log in
   */
  toLogin(): void {
    this.router.navigateByUrl('/login');
  }
}