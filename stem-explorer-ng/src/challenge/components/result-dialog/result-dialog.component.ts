import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { Challenge } from 'src/challenge/models/challenge';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Store } from '@ngxs/store';
import { LastHomepageState } from 'src/app/store/last-homepage/last-homepage.state';
import { ChallengeLevel } from 'src/challenge/models/challenge-level';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResultDialogData,
    public auth: AuthService,
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
