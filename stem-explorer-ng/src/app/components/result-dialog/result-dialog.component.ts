import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { ChallengeLevel } from 'src/app/shared/models/challenge-level';
import { Challenge } from 'src/app/shared/models/challenge';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Store, Select } from '@ngxs/store';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';
import { CurrentUserState } from 'src/app/store/current-user/current-user.state';
import { Observable } from 'rxjs';

export interface ResultDialogData {
  level: ChallengeLevel;
  challenge: Challenge;
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

  @Select(CurrentUserState.isLoggedIn) isLoggedIn$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResultDialogData,
    private router: Router,
    private dialogRef: MatDialogRef<ResultDialogComponent>,
    private store: Store,
  ) { }

  get category() {
    return this.data.isCorrect ? this.data.challenge.category : null;
  }

  get lastHomepage() {
    return this.store.selectSnapshot(LastHomepageState.lastHomepage);
  }

  navigateToHomepage() {
    this.router.navigateByUrl(this.lastHomepage);
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  nextLevel() {
    this.dialogRef.close('next-level');
  }

}
