import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';

import { AuthService } from 'src/app/shared/auth/auth.service';

import { LoadProgress } from './progress.actions';
import { Progress } from 'src/app/shared/models/progress';
import { tap, flatMap, switchMap, filter } from 'rxjs/operators';
import { from } from 'rxjs';
import { ProfilesState } from '../profiles/profiles.state';

export interface ProgressStateModel {
  progress: Progress[];
  fetched: boolean;
}

const PROGRESS_TOKEN: StateToken<ProgressStateModel> = new StateToken('progress');

@State<ProgressStateModel>({
  name: PROGRESS_TOKEN,
  defaults: {
    progress: [],
    fetched: false,
  },
  children: [],
})
@Injectable()
export class ProgressState {
  constructor(
    private authService: AuthService,
    private store: Store,
  ) { }

  @Selector()
  public static completedLevels(state: ProgressStateModel): number[] {
    return state.progress
      .filter((progress) => progress.correct)
      .map((progress) => progress.challengeLevelId);
  }

  @Action(LoadProgress)
  public loadProgress(ctx: StateContext<ProgressStateModel>, action: LoadProgress) {
    const { fetched } = ctx.getState();
    if (fetched && !action.overrideCache) {
      return;
    }

    const profile = this.store.selectSnapshot(ProfilesState.currentProfile);
    if (!profile) {
      return;
    }

    return from(this.authService.getProgress(profile.id)).pipe(
      tap((progress) => ctx.patchState({ progress, fetched: true }))
    );
  }
}


