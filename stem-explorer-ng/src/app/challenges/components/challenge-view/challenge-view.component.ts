import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { map } from 'rxjs/operators';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { Challenge } from 'src/app/shared/models/challenge';
import { ChallengeLevel } from 'src/app/shared/models/challenge-level';
import { ApiService } from 'src/app/shared/services/api.service';
import { LoadChallengeLevelsData } from 'src/app/store/challenge-levels/challenge-levels.actions';
import { ChallengeLevelsState } from 'src/app/store/challenge-levels/challenge-levels.state';
import { LoadChallengesData } from 'src/app/store/challenges/challenges.actions';
import { ChallengesState } from 'src/app/store/challenges/challenges.state';
import { HintDialogComponent } from '../../components/hint-dialog/hint-dialog.component';
import { ResultDialogComponent } from '../../components/result-dialog/result-dialog.component';
import { AnswerDialogComponent } from '../answer-dialog/answer-dialog.component';

@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss'],
})
export class ChallengeViewComponent implements OnInit {
  // private challengesChangeSubscription: Subscription;

  challengeId: string;
  challenge: Challenge;
  levels: ChallengeLevel[] = [];
  levelsDropdown: number[] = [];
  selectedLevel: ChallengeLevel;

  Colour = StemColours;
  Categories = Categories;
  Levels = Levels;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog,
    private gtmService: GoogleTagManagerService,
    private api: ApiService
  ) {
    this.challengeId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    // @todo remove when API is working
    this.store.dispatch(new LoadChallengesData());
    this.store.dispatch(new LoadChallengeLevelsData());

    this.getChallenge();
    this.getChallengeLevels();
  }

  levelChange(event): void {
    this.selectedLevel = this.levels.find(l =>
      l.difficulty === event.value);
  }

  getHint() {
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

  onAnswer() {
    const answerDialog = this.dialog.open(AnswerDialogComponent, {
      data: {
        level: this.selectedLevel,
        challenge: this.challenge,
      },
      panelClass: 'app-dialog',
    });
    this.gtmTag('answer attempt');

    answerDialog.afterClosed().subscribe(res => {
      if (res !== undefined) {
        this.resultsDialog(res);
        this.gtmTag(res ? 'answer correct' : 'answer incorrect');
      }
    });
  }

  private getChallenge(): void {
    // remove this when api for single challenge is working
    this.store.select(ChallengesState.challenge).pipe(map(
      (fn) => fn(1)
    )).pipe(map(res => {
      this.challenge = res;
    })).subscribe();

    // code to get individual challenge from API
    // this.api.getChallenge(this.challengeId)
    //   .pipe(map(res => this.challenge = res)).subscribe();
  }

  private getChallengeLevels(): void {
    // needs to be replaced with api endpoint to get specific levels
    this.store.select(ChallengeLevelsState.challengeLevels).pipe(map(
      (fn) => fn(1)
    )).pipe(map(res => {
      this.levels = res;
      this.levels.forEach(l => {
        this.levelsDropdown.push(l.difficulty);
      });
      this.levelsDropdown.sort((a, b) => a - b);
      this.selectedLevel = this.levels[0];
    })).subscribe();
  }

  private resultsDialog(success: boolean) {
    const dialog = this.dialog.open(ResultDialogComponent, {
      data: {
        level: this.selectedLevel,
        challenge: this.challenge,
        isCorrect: success,
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
    this.selectedLevel = this.levels[idx + 1];
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
