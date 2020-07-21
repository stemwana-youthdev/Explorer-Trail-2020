import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { ChallengeLevel } from 'src/app/shared/models/challenge-level';
import { Challenge } from 'src/app/shared/models/challenge';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

export interface IncorrectDialogData {
  level: ChallengeLevel;
  challenge: Challenge;
}

@Component({
  selector: 'app-incorrect-dialog',
  templateUrl: './incorrect-dialog.component.html',
  styleUrls: ['./incorrect-dialog.component.scss']
})
export class IncorrectDialogComponent {

  Levels: any = Levels;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IncorrectDialogData,
    public auth: AuthService,
    private router: Router,
  ) { }

  navigateToHomepage() {
    this.router.navigateByUrl('/');
  }

}
