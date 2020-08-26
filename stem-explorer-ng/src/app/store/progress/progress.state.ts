import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';

import { AuthService } from 'src/app/shared/auth/auth.service';

import { WatchProgress, LoadProgress } from './progress.actions';
import { Progress } from 'src/app/shared/models/progress';
import { tap, flatMap, switchMap, filter } from 'rxjs/operators';
import { from } from 'rxjs';
import { ProfilesState } from '../profiles/profiles.state';

export interface ProgressStateModel {
  progress: Progress[];
  watching: boolean;
}

const PROGRESS_TOKEN: StateToken<ProgressStateModel> = new StateToken('progress');

@State<ProgressStateModel>({
  name: PROGRESS_TOKEN,
  defaults: {
    progress: [],
    watching: false,
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

  @Action(WatchProgress)
  public watchProgress(ctx: StateContext<ProgressStateModel>) {
    const { watching } = ctx.getState();
    if (watching) {
      return;
    }
    ctx.patchState({ watching: true });

    return this.store.select(ProfilesState.currentProfile).pipe(
      filter((profile) => !!profile),
      switchMap((profile) => from(this.authService.getProgress(profile.id))),
      tap((progress) => ctx.patchState({ progress })),
    );
  }

  @Action(LoadProgress)
  public loadProgress(ctx: StateContext<ProgressStateModel>) {
    const profile = this.store.selectSnapshot(ProfilesState.currentProfile);
    if (!profile) {
      return;
    }

    return from(this.authService.getProgress(profile.id)).pipe(
      tap((progress) => ctx.patchState({ progress }))
    );
  }
}


