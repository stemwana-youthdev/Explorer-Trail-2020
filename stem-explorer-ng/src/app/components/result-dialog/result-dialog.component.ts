import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { ChallengeLevel } from 'src/app/shared/models/challenge-level';
import { Challenge } from 'src/app/shared/models/challenge';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

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
  ) { }

  get category() {
    return this.data.isCorrect ? this.data.challenge.category : null;
  }

  navigateToHomepage() {
    this.router.navigateByUrl('/');
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
