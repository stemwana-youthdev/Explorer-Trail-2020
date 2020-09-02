import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { filter, take } from 'rxjs/operators';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';
import { Challenge, ChallengeLevel } from 'src/challenge/models/challenge';
import { ChallengeApiService } from 'src/challenge/services/challenge-api.service';
import { AnswerDialogComponent } from '../answer-dialog/answer-dialog.component';
import { HintDialogComponent } from '../hint-dialog/hint-dialog.component';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { AuthService } from 'src/app/shared/auth/auth.service';

import { Store } from '@ngxs/store';
import { LoadProfiles } from 'src/app/store/profiles/profiles.actions';
import { ProfilesState } from 'src/app/store/profiles/profiles.state';
import { Profile } from 'src/app/shared/models/profile';

@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss'],
})
export class ChallengeViewComponent implements OnInit {
  challengeId: number;
  challenge: Challenge;
  selectedLevel: ChallengeLevel;
  _levelIsCompleted = false;

  Colour = StemColours;
  Categories = Categories;
  Levels = Levels;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private api: ChallengeApiService,
    private gtmService: GoogleTagManagerService,
    private authService: AuthService,
    private store: Store,
  ) {
    this.challengeId = +this.route.snapshot.params['id'];
  }

  get currentLevelIsCompleted(): boolean {
    return this._levelIsCompleted;
  }

  ngOnInit(): void {
    this.loadChallenge();
  }

  trackLevel(idx, item) {
    if (!item) { return null; }
    return idx;
  }

  /**
   * Method hit when drop down is changed, changes the selected level.
   * @param event drop down event, event.value being the level enum
   */
  levelChange(event): void {
    this.selectedLevel = this.challenge.challengeLevels.find(l =>
      l.difficulty === event.value
    );
  }

  /**
   * Method hit when the Get Hint button is pressed, triggers the Hint Dialog component
   */
  getHint(): void {
    this.dialog.open(HintDialogComponent, {
      data: {
        title: this.challenge.title,
        category: this.challenge.category,
        level: this.selectedLevel
      },
      panelClass: 'app-dialog'
    });
    this.gtmTag('get hint');
  }

  /**
   * Method called when Enter answer button is pressed. Opens the answer dialog component,
   * then checks if the answer is correct, is true marks the level as completed and then
   * triggers the results dialog to open.
   */
  enterAnswer(): void {
    const answerDialog = this.dialog.open(AnswerDialogComponent, {
      data: {
        level: this.selectedLevel,
        challenge: this.challenge
      },
      panelClass: 'app-dialog'
    });
    this.gtmTag('answer attempt');

    answerDialog.afterClosed().subscribe(response => {
      if (response !== undefined && response.length) {
        const result = this.api.checkAnswer(this.selectedLevel, response);

        if (result) {
          this.markLevelCompleted();
        }

        this.saveResult(result);
        this.resultsDialog(result);
        this.gtmTag(result ? 'answer correct' : 'answer wrong');
      }
    });
  }

  /**
   * Copies the selected level to a new object with isCompleted as true, then replaces
   * the selected level and with that new object. This keeps the isCompleted state for that
   * level even when the user changes level and comes back again.
   */
  private markLevelCompleted(): void {
    const completed = {
      ...this.selectedLevel,
      complete: true
    };
    const idx = this.challenge.challengeLevels.indexOf(this.selectedLevel);

    this.challenge.challengeLevels[idx] = completed;
    this.selectedLevel = completed;
  }

  private async saveResult(result: boolean) {
    const loggedIn = await this.authService.isLoggedIn.pipe(take(1)).toPromise();
    if (loggedIn) {
      const profile = await this.store
        .select(ProfilesState.currentProfile)
        .pipe(
          filter((p) => !!p),
          take(1),
        )
        .toPromise();
      const token = await this.authService.getToken();
      await this.api
        .levelCompleted(token, profile.id, this.selectedLevel.id, result)
        .toPromise();
    }
  }

  /**
   * Loads the challenge and sets the selected level as the lowest.
   */
  private async loadChallenge() {
    let profile = null as Profile;
    const loggedIn = await this.authService.isLoggedIn.pipe(take(1)).toPromise();
    if (loggedIn) {
      this.store.dispatch(new LoadProfiles());
      profile = await this.store
        .select(ProfilesState.currentProfile)
        .pipe(
          filter((p) => !!p),
          take(1),
        )
        .toPromise();
    }

    const token = await this.authService.getToken();
    const challenge = await this.api
      .getChallenge(this.challengeId, token, profile?.id)
      .toPromise();

    this.challenge = challenge;
    this.selectedLevel = challenge.challengeLevels.find((level) => !level.complete) ?? challenge.challengeLevels[0];
  }

  /**
   * Method that opens the results dialog component and then checks for the user's action on close
   * and if user chooses next level, changes to the next level, and if user chooses to try again
   * reopens the answers dialog component.
   * @param success answer is true or false
   */
  private resultsDialog(success: boolean): void {
    const dialog = this.dialog.open(ResultDialogComponent, {
      data: {
        difficulty: this.selectedLevel.difficulty,
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
        this.enterAnswer();
      }
    });
  }

  /**
   * changes the selected level to the next level
   */
  private changeLevel(): void {
    const idx = this.challenge.challengeLevels.indexOf(this.selectedLevel);
    this.selectedLevel = this.challenge.challengeLevels[idx + 1];
  }

  /**
   * checks if there is a next level
   */
  private hasNextLevel(): boolean {
    const idx = this.challenge.challengeLevels.indexOf(this.selectedLevel);
    return (idx + 1 > this.challenge.challengeLevels.length);
  }

  /**
   * add tag to GTM on challenge actions
   * @param event string for what the user is doing, i.e. 'answer attempt'
   */
  private gtmTag(event: string): void {
    const tag = {
      event,
      challengeTitle: this.challenge.title,
      level: this.selectedLevel.difficulty
    };
    this.gtmService.pushTag(tag);
  }
}
