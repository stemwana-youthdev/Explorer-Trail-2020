import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ChallengeApiService } from 'src/challenge/services/challenge-api.service';

@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss'],
})
export class ChallengeViewComponent implements OnInit, OnDestroy {
  selectedLevel: number;

  challengeId: number;

  // private challengesChangeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private api: ChallengeApiService,
    private auth: AuthService,
    private gtmService: GoogleTagManagerService,
  ) {
    // tslint:disable-next-line: no-string-literal
    this.challengeId = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadChallenge()
  }

  ngOnDestroy(): void {
    // this.challengesChangeSubscription.unsubscribe();
  }

  private loadChallenge() {
    this.api.getChallenge(this.challengeId).pipe().subscribe();
  }

  // private listenToChallengeLevelsChanges() {
  //   this.challengesChangeSubscription = this.incompleteLevels$.pipe(
  //     map((incompleteLevels) => {
  //       const difficulties = incompleteLevels.map((level) => level.difficulty);
  //       return Math.min(...difficulties);
  //     }),
  //     filter((minLevel) => minLevel < Infinity),
  //   )
  //   .subscribe((minLevel) => {
  //     this.selectedLevel = minLevel;
  //   });

  //   const loadProfilesSubscription = this.isLoggedIn$.subscribe({
  //     next: (isLoggedIn) => {
  //       if (isLoggedIn) {
  //         this.store.dispatch(new LoadProfiles());
  //       }
  //     },
  //   });
  //   this.challengesChangeSubscription.add(loadProfilesSubscription);

  //   const loadProgressSubscription = this.currentProfile$.subscribe({
  //     next: (profile) => {
  //       if (profile) {
  //         this.store.dispatch(new LoadProgress(profile.id));
  //       }
  //     },
  //   });
  //   this.challengesChangeSubscription.add(loadProgressSubscription);
  // }

  // get challengeId$(): Observable<number> {
  //   return this.route.params.pipe(map((routeParams) => +routeParams.id));
  // }

  // get isLoggedIn$(): Observable<boolean> {
  //   return this.auth.isLoggedIn;
  // }

  // get challenge$(): Observable<Challenge> {
  //   return combineLatest([
  //     this.store.select(ChallengesState.challenge),
  //     this.challengeId$,
  //   ]).pipe(
  //     map(([fn, challengeId]) => fn(challengeId)),
  //   );
  // }

  // get challengeLevels$(): Observable<ChallengeLevel[]> {
  //   return combineLatest([
  //     this.store.select(ChallengeLevelsState.challengeLevels),
  //     this.challengeId$,
  //   ]).pipe(
  //     map(([fn, challengeId]) => fn(challengeId)),
  //   );
  // }

  // get completedLevels$(): Observable<number[]> {
  //   return this.store.select(ProgressState.completedLevels);
  // }

  // get incompleteLevels$(): Observable<ChallengeLevel[]> {
  //   return combineLatest([this.challengeLevels$, this.completedLevels$]).pipe(
  //     map(([challengeLevels, completedLevels]) =>
  //       challengeLevels.filter(
  //         (level) =>
  //           !completedLevels.some(
  //             (completedLevel) => completedLevel === level.uid
  //           )
  //       )
  //     ),
  //   );
  // }

  // get currentProfile$(): Observable<Profile> {
  //   return this.store.select(ProfilesState.currentProfile);
  // }

  // onLevelChange(level: number) {
  //   this.selectedLevel = level;
  // }

  // onHint({ challenge, level }: HintEvent) {
  //   this.openHintDialog(challenge, level);
  //   // push to dataLayer
  //   const gtmTag = {
  //     event: 'get hint',
  //     challengeTitle: challenge.title,
  //     level: level.difficulty
  // };
  //   this.gtmService.pushTag(gtmTag);
  // }

  // onAnswer({ challenge, level }: AnswerEvent) {
  //   this.openAnswerDialog(challenge, level);
  // }

  // async openHintDialog(challenge: Challenge, level: ChallengeLevel) {
  //   this.dialog.open(HintDialogComponent, {
  //     data: {
  //       challenge,
  //       level,
  //     },
  //     panelClass: 'app-dialog',
  //   });
  // }

  // // Async allows us to do this in an imperative style w/o blocking
  // async openAnswerDialog(challenge: Challenge, level: ChallengeLevel) {
  //   // Open the answer dialog
  //   const answerDialog = this.dialog.open(AnswerDialogComponent, {
  //     data: {
  //       challenge,
  //       level,
  //     },
  //     panelClass: 'app-dialog',
  //   });

  //   // Wait until the dialog is closed
  //   const isCorrect = await answerDialog.afterClosed().toPromise();
  //   // Ignore if the user closed the dialog without selecting an answer
  //   if (typeof isCorrect !== 'boolean') {
  //     return;
  //   }

  //   // Record that the user completed the level
  //   const nextLevel = await this.getNextLevel();
  //   const isLoggedIn = await this.isLoggedIn$.pipe(take(1)).toPromise();
  //   if (isLoggedIn) {
  //     const profile = await this.currentProfile$.pipe(take(1)).toPromise();
  //     await this.auth.levelCompleted(profile.id, level.uid, isCorrect);
  //     this.store.dispatch(new LoadProgress(profile.id));
  //   }

  //   // Open another dialog
  //   const hasNext = nextLevel !== null;
  //   const resultDialog = this.dialog.open(ResultDialogComponent, {
  //     data: {
  //       level,
  //       challenge,
  //       isCorrect,
  //       hasNext,
  //     },
  //     panelClass: 'app-dialog',
  //   });

  //   // Wait until the dialog is closed
  //   const dialogResult = await resultDialog.afterClosed().toPromise();
  //   // If the user clicked next level, switch to the next level
  //   if (dialogResult === 'next-level') {
  //     this.selectedLevel = nextLevel ?? this.selectedLevel;
  //   }
  // }

  // async getNextLevel() {
  //   const challengeLevels = await this.challengeLevels$
  //     .pipe(take(1))
  //     .toPromise();
  //   const difficulties = challengeLevels.map((level) => level.difficulty);
  //   const higherLevels = difficulties.filter((d) => d > this.selectedLevel);
  //   const nextLevel = Math.min(...higherLevels);
  //   if (nextLevel < Infinity) {
  //     return nextLevel;
  //   } else {
  //     return null;
  //   }
  // }
}
