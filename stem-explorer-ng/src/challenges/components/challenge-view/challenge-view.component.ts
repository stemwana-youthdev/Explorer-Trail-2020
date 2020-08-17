import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { map } from 'rxjs/operators';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { Challenge } from 'src/app/shared/models/challenge';
import { ChallengeLevel } from 'src/app/shared/models/challenge-level';
import { ChallengesApiService } from 'src/challenges/services/api.service';
import { HintDialogComponent } from '../../components/hint-dialog/hint-dialog.component';
import { ResultDialogComponent } from '../../components/result-dialog/result-dialog.component';
import { AnswerDialogComponent } from '../answer-dialog/answer-dialog.component';

@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss'],
})
export class ChallengeViewComponent implements OnInit {
  challengeId: number;
  challenge: Challenge;
  levels: ChallengeLevel[] = [];
  levelsDropdown: number[] = [];
  selectedLevel: ChallengeLevel;

  Colour = StemColours;
  Categories = Categories;
  Levels = Levels;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private gtmService: GoogleTagManagerService,
    private api: ChallengesApiService
  ) {
    // tslint:disable-next-line: no-string-literal
    this.challengeId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getChallenge();
  }

  /**
   * Method for the levels drop down to change the selected level.
   * @param event MatSelectChange event, value returns the requested level difficulty
   */
  levelChange(event): void {
    this.selectedLevel = this.levels.find(l =>
      l.difficulty === event.value);
  }

  /**
   * opens the hint dialog
   */
  getHint(): void {
    this.dialog.open(HintDialogComponent, {
      data: {
        title: this.challenge.title,
        level: this.selectedLevel.difficulty,
        hint: this.selectedLevel.hint,
        category: this.challenge.category,
      },
      panelClass: 'app-dialog',
    });
    // push to dataLayer
    this.gtmTag('get hint');
  }

  /**
   * opens the dialog to answer the challenge. When answer is submitted, checks answer
   * against api endpoint and opens results dialog
   */
  onAnswer(): void {
    const answerDialog = this.dialog.open(AnswerDialogComponent, {
      data: {
        level: this.selectedLevel,
        challenge: this.challenge,
      },
      panelClass: 'app-dialog',
    });
    this.gtmTag('answer attempt');

    answerDialog.afterClosed().subscribe(response => {
      if (response !== undefined && response.length) {
        const result = this.api.putAnswer(this.selectedLevel, response);
        this.resultsDialog(result);
        this.gtmTag(result ? 'answer correct' : 'answer incorrect');
      }
    });
  }

  /**
   * gets the challenge from the api and then calls the getChallengeLevels method
   */
  private getChallenge(): void {
    this.api.getChallenge(this.challengeId).pipe(map(res => {
      this.challenge = res;
      this.getChallengeLevels();
    })).subscribe();
  }

  /**
   * Gets the levels related to the challenge.
   * @todo fix when api endpoint is done
   */
  private getChallengeLevels(): void {
    // needs to be replaced with api endpoint to get specific levels
    this.api.getChallengeLevels(this.challengeId).pipe(map((res: ChallengeLevel[]) => {
      // tslint:disable-next-line: no-string-literal
      res['challengeLevels'].forEach(level => {
        if (level.challengeId === this.challengeId) {
          this.levels.push(level);
        }
      });
      this.selectedLevel = this.levels[0];
    })).subscribe();
  }

  /**
   * opens the results dialog for either success or fail.
   * @param success boolean for answer correct
   */
  private resultsDialog(success: boolean): void {
    const dialog = this.dialog.open(ResultDialogComponent, {
      data: {
        level: this.selectedLevel.difficulty,
        title: this.challenge.title,
        category: this.challenge.category,
        isCorrect: success,
        hasNextLevel: this.hasNextLevel()
      },
      panelClass: 'app-dialog'
    });
    dialog.afterClosed().subscribe(res => {
      if (res === 'next-level') {
        this.changeLevel();
      }
      if (res === 'try-again') {
        this.onAnswer();
      }
    });
  }

  private changeLevel() {
    const idx = this.levels.indexOf(this.selectedLevel);
    console.warn(idx);
    this.selectedLevel = this.levels[idx + 1];
  }

  private hasNextLevel(): boolean {
    const idx = this.levels.indexOf(this.selectedLevel);
    if (idx + 1 > this.levels.length) {
      return false;
    }
    return true;
  }

  private gtmTag(event: string): void {
    const tag = {
      event,
      challengeTitle: this.challenge.title,
      level: this.selectedLevel.difficulty
    };
    this.gtmService.pushTag(tag);
  }
}
