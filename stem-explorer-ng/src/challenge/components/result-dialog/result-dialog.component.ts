import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';

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
export class ResultDialogComponent implements OnInit {
  Levels: any = Levels;
  cssClass: string;
  Category = Categories;
  message = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResultDialogData,
    public auth: AuthService,
    private router: Router,
    private store: Store,
    private messageService: MessageService,
  ) {
    this.cssClass = `inverted ${this.data.isCorrect ? StemColours[this.data.category] : 'pink'}`;
  }

  ngOnInit() {
    this.messageService
      .getMessage(this.data.isCorrect ? 'result-success' : 'result-failure')
      .then((message) => {
        this.message = message;
      });
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
