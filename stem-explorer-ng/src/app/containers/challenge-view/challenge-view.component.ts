import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

import { ChallengeLevelsState } from '../../store/challenge-levels/challenge-levels.state';
import { ChallengesState } from '../../store/challenges/challenges.state';
import { LoadChallengesData } from '../../store/challenges/challenges.actions';
import { LoadChallengeLevelsData } from '../../store/challenge-levels/challenge-levels.actions';
import { LoadProgress } from '../../store/progress/progress.actions';

import { Challenge } from '../../shared/models/challenge';
import { ChallengeLevel } from '../../shared/models/challenge-level';

import { AnswerDialogComponent } from '../../containers/answer-dialog/answer-dialog.component';

import { HintDialogComponent } from '../../components/hint-dialog/hint-dialog.component';
import { ResultDialogComponent } from '../../components/result-dialog/result-dialog.component';
import { HintEvent, AnswerEvent } from '../../components/challenge-details/challenge-details.component';
import { CurrentUserState } from 'src/app/store/current-user/current-user.state';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss'],
})
export class ChallengeViewComponent implements OnInit, OnDestroy {
  selectedLevel: number;

  private challengesChangeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog,
    private api: ApiService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadChallengesData());
    this.store.dispatch(new LoadChallengeLevelsData());

    this.listenToChallengeLevelsChanges();
  }

  ngOnDestroy(): void {
    this.challengesChangeSubscription.unsubscribe();
  }

  private listenToChallengeLevelsChanges() {
    this.challengesChangeSubscription = this.challengeLevels$
      .pipe(
        map((challengeLevels) => {
          const difficulties = challengeLevels.map((level) => level.difficulty);
          return Math.min(...difficulties);
        }),
        filter((minLevel) => minLevel < Infinity),
      )
      .subscribe((minLevel) => {
        this.selectedLevel = minLevel;
      });

    const loadProgressSubscription = combineLatest([
      this.challengeId$,
      this.isLoggedIn$,
    ]).subscribe({
      next: ([challengeId, isLoggedIn]) => {
        if (isLoggedIn) {
          this.store.dispatch(new LoadProgress(challengeId));
        }
      },
    });
    this.challengesChangeSubscription.add(loadProgressSubscription);
  }

  get challengeId$(): Observable<number> {
    return this.route.params.pipe(map((routeParams) => +routeParams.id));
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.store.select(CurrentUserState.isLoggedIn);
  }

  get challenge$(): Observable<Challenge> {
    return combineLatest([
      this.store.select(ChallengesState.challenge),
      this.challengeId$,
    ]).pipe(
      map(([fn, challengeId]) => fn(challengeId)),
    );
  }

  get challengeLevels$(): Observable<ChallengeLevel[]> {
    return combineLatest([
      this.store.select(ChallengeLevelsState.challengeLevels),
      this.challengeId$,
    ]).pipe(
      map(([fn, challengeId]) => fn(challengeId)),
    );
  }

  onLevelChange(level: number) {
    this.selectedLevel = level;
  }

  onHint({ challenge, level }: HintEvent) {
    this.openHintDialog(
      challenge.title,
      this.selectedLevel,
      level.hint,
      challenge.category,
    );
  }

  onAnswer({ challenge, level }: AnswerEvent) {
    this.openAnswerDialog(challenge, level);
  }

  openHintDialog(title, level, hint, category) {
    this.dialog.open(HintDialogComponent, {
      data: {
        title,
        level,
        hint,
        category,
      },
      panelClass: 'app-dialog',
    });
  }

  // Async allows us to do this in an imperative style w/o blocking
  async openAnswerDialog(challenge: Challenge, currentLevel: ChallengeLevel) {
    // Open the answer dialog
    const answerDialog = this.dialog.open(AnswerDialogComponent, {
      data: {
        level: currentLevel,
        challenge,
      },
      panelClass: 'app-dialog',
    });

    // Wait until the dialog is closed
    const isCorrect = await answerDialog.afterClosed().toPromise();
    // Ignore if the user closed the dialog without selecting an answer
    if (typeof isCorrect !== 'boolean') {
      return;
    }

    // Tell the backend that the user completed the level
    if (isCorrect) {
      await this.api.levelCompleted(currentLevel.uid).toPromise();
    }

    // Open another dialog
    const hasNext = await this.getNextLevel() !== null;
    const resultDialog = this.dialog.open(ResultDialogComponent, {
      data: {
        level: currentLevel,
        challenge,
        isCorrect,
        hasNext,
      },
      panelClass: 'app-dialog',
    });

    // Wait until the dialog is closed
    const dialogResult = await resultDialog.afterClosed().toPromise();
    // If the user clicked next level, switch to the next level
    if (dialogResult === 'next-level') {
      this.selectedLevel = (await this.getNextLevel()) ?? this.selectedLevel;
    }
  }

  async getNextLevel() {
    const challengeLevels = await this.challengeLevels$
      .pipe(take(1))
      .toPromise();
    const difficulties = challengeLevels.map((level) => level.difficulty);
    const higherLevels = difficulties.filter((d) => d > this.selectedLevel);
    const nextLevel = Math.min(...higherLevels);
    if (nextLevel < Infinity) {
      return nextLevel;
    } else {
      return null;
    }
  }
}
