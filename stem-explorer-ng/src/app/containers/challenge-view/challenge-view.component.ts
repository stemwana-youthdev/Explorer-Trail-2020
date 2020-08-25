import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

import { ChallengeLevelsState } from '../../store/challenge-levels/challenge-levels.state';
import { ChallengesState } from '../../store/challenges/challenges.state';
import { LoadChallengesData } from '../../store/challenges/challenges.actions';
import { LoadChallengeLevelsData } from '../../store/challenge-levels/challenge-levels.actions';
import { WatchProgress, CompleteLevel } from '../../store/progress/progress.actions';
import { ProgressState } from '../../store/progress/progress.state';
import { ProfilesState } from 'src/app/store/profiles/profiles.state';

import { Challenge } from '../../shared/models/challenge';
import { ChallengeLevel } from '../../shared/models/challenge-level';
import { Profile } from 'src/app/shared/models/profile';

import { AnswerDialogComponent } from '../../containers/answer-dialog/answer-dialog.component';

import { ResultDialogComponent } from '../../components/result-dialog/result-dialog.component';
import { HintEvent, AnswerEvent } from '../../components/challenge-details/challenge-details.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { WatchProfiles } from 'src/app/store/profiles/profiles.actions';
import { HintDialogComponent } from '../hint-dialog/hint-dialog.component';


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
    private auth: AuthService,
    private gtmService: GoogleTagManagerService,
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
    this.challengesChangeSubscription = this.incompleteLevels$.pipe(
      map((incompleteLevels) => {
        const difficulties = incompleteLevels.map((level) => level.difficulty);
        return Math.min(...difficulties);
      }),
      filter((minLevel) => minLevel < Infinity),
    )
    .subscribe((minLevel) => {
      this.selectedLevel = minLevel;
    });

    this.store.dispatch(new WatchProfiles());
    this.store.dispatch(new WatchProgress());
  }

  get challengeId$(): Observable<number> {
    return this.route.params.pipe(map((routeParams) => +routeParams.id));
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.auth.isLoggedIn;
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

  get completedLevels$(): Observable<number[]> {
    return this.store.select(ProgressState.completedLevels);
  }

  get incompleteLevels$(): Observable<ChallengeLevel[]> {
    return combineLatest([this.challengeLevels$, this.completedLevels$]).pipe(
      map(([challengeLevels, completedLevels]) =>
        challengeLevels.filter(
          (level) =>
            !completedLevels.some(
              (completedLevel) => completedLevel === level.uid
            )
        )
      ),
    );
  }

  get currentProfile$(): Observable<Profile> {
    return this.store.select(ProfilesState.currentProfile);
  }

  onLevelChange(level: number) {
    this.selectedLevel = level;
  }

  onHint({ challenge, level }: HintEvent) {
    this.openHintDialog(challenge, level);
    // push to dataLayer
    const gtmTag = {
      event: 'get hint',
      challengeTitle: challenge.title,
      level: level.difficulty
  };
    this.gtmService.pushTag(gtmTag);
  }

  onAnswer({ challenge, level }: AnswerEvent) {
    this.openAnswerDialog(challenge, level);
  }

  async openHintDialog(challenge: Challenge, level: ChallengeLevel) {
    this.dialog.open(HintDialogComponent, {
      data: {
        challenge,
        level,
      },
      panelClass: 'app-dialog',
    });
  }

  // Async allows us to do this in an imperative style w/o blocking
  async openAnswerDialog(challenge: Challenge, level: ChallengeLevel) {
    // Open the answer dialog
    const answerDialog = this.dialog.open(AnswerDialogComponent, {
      data: {
        challenge,
        level,
      },
      panelClass: 'app-dialog',
    });

    // Wait until the dialog is closed
    const isCorrect = await answerDialog.afterClosed().toPromise();
    // Ignore if the user closed the dialog without selecting an answer
    if (typeof isCorrect !== 'boolean') {
      return;
    }

    // Record that the user completed the level
    const nextLevel = await this.getNextLevel();
    const isLoggedIn = await this.isLoggedIn$.pipe(take(1)).toPromise();
    if (isLoggedIn) {
      const profile = await this.currentProfile$.pipe(take(1)).toPromise();
      await this.auth.levelCompleted(profile.id, level.uid, isCorrect);
      this.store.dispatch(new CompleteLevel(profile.id, challenge.id, level.uid, isCorrect));
    } else {
      this.store.dispatch(new CompleteLevel(0, challenge.id, level.uid, isCorrect));
    }

    // Open another dialog
    const hasNext = nextLevel !== null;
    const resultDialog = this.dialog.open(ResultDialogComponent, {
      data: {
        level,
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
      this.selectedLevel = nextLevel ?? this.selectedLevel;
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
