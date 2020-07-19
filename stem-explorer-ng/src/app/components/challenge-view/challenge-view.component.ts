import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Challenge } from '../../shared/models/challenge';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '../../shared/enums/categories.enum';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { ChallengeLevel } from 'src/app/shared/models/challenge-level';
import { MatDialog } from '@angular/material/dialog';
import { HintDialogComponent } from '../hint-dialog/hint-dialog.component';
import { AnswerDialogComponent } from 'src/app/containers/answer-dialog/answer-dialog.component';

@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss']
})
export class ChallengeViewComponent implements OnInit {

  challenge = {} as Challenge;
  id: number;
  Categories: any = Categories;
  Levels: any = Levels;
  challengeInfo: ChallengeLevel[] = [];
  levels: number[] = [];
  selectedLevel: number;
  currentLevel = {} as ChallengeLevel;

  constructor(private service: ApiService, private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getChallenge();
    this.getChallengeLevels();

    // Gets the id from the current route
    this.route.params.subscribe(params => {
      this.id = +params.id;
   });
  }


  /*
  * Gets one challenge based on the uid
  */
 getChallenge() {
  this.service.getChallenges().subscribe((res) => {
    // tslint:disable-next-line: no-string-literal
    this.challenge = res['challenges'].find(item => item.uid === this.id);
    });
}

  /*
  * Uses ApiService to get challengeLevels information and stores all challenge information
  * for the current challenge in challengeLevel. Then it stores an array of the level numbers into
  * another property, levels. It also sets the default level to be the lowest in the level array.
  */
  getChallengeLevels() {
    this.service.getChallengeLevels().subscribe((res) => {
      // tslint:disable-next-line: no-string-literal
      this.challengeInfo = res['challengeLevels'].filter(item => item.challengeId === this.id);
      this.levels = this.challengeInfo.map(level => level.difficulty);
      this.selectedLevel = Math.min(...this.levels);
      this.getCurrentChallenge(this.selectedLevel);
      });
  }

  // Gets the current challenge information based on the level selected
  getCurrentChallenge(value) {
    this.currentLevel = this.challengeInfo.find(challenge => challenge.difficulty === value);
  }

  openHintDialog(title, level, hint, category) {
    this.dialog.open(HintDialogComponent, {
      data: {
        title,
        level,
        hint,
        category
      },
      panelClass: 'app-dialog',
    });
  }

  async openAnswerDialog() {
    const answerDialog = this.dialog.open(AnswerDialogComponent, {
      data: {
        level: this.currentLevel,
        challenge: this.challenge,
      },
      panelClass: 'app-dialog',
    });

    const isCorrect = await answerDialog.afterClosed().toPromise();
    if (typeof isCorrect !== 'boolean') {
      return;
    }

    if (isCorrect) {
      console.log('correct');
    } else {
      console.log('incorrect');
    }
  }

}
