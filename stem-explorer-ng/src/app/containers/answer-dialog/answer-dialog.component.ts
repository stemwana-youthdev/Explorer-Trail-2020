import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Levels } from '../../shared/enums/levels.enum';
import { ChallengeAnswer, ChallengeLevels } from 'src/app/shared/models/challenge-levels';
import { Challenge } from 'src/app/shared/models/challenge';
import { AnswerType } from 'src/app/shared/enums/answer-type.enum';
import { InputComponent } from 'src/app/shared/components/input/input.component';

export interface AnswerDialogData {
  level: ChallengeLevels;
  challenge: Challenge;
}

/*
* Component for the list view dialog for more information
*/
@Component({
  selector: 'app-answer-dialog',
  templateUrl: './answer-dialog.component.html',
  styleUrls: ['./answer-dialog.component.scss']
})
export class AnswerDialogComponent {

  Levels: any = Levels;
  AnswerType: any = AnswerType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AnswerDialogData,
    private router: Router,
  ) { }

  answerSelected(answer: ChallengeAnswer) {
    console.log('Answer selected:', answer);
  }

}
