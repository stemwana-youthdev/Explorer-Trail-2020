import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';

import { AuthService } from 'src/app/shared/auth/auth.service';

import { LoadProgress } from './progress.actions';
import { Progress } from 'src/app/shared/models/progress';
import { tap } from 'rxjs/operators';
import { from } from 'rxjs';

export interface ProgressStateModel {
  progress: Progress[];
}

const PROGRESS_TOKEN: StateToken<ProgressStateModel> = new StateToken('progress');

@State<ProgressStateModel>({
  name: PROGRESS_TOKEN,
  defaults: {
    progress: [],
  },
  children: [],
})
@Injectable()
export class ProgressState {
  constructor(
    private authService: AuthService,
  ) { }

  @Selector()
  public static completedLevels(state: ProgressStateModel): number[] {
    return state.progress
      .filter((progress) => progress.correct)
      .map((progress) => progress.challengeLevelId);
  }

  @Action(LoadProgress)
  public loadProgress(ctx: StateContext<ProgressStateModel>, action: LoadProgress) {
    return from(this.authService.getProgress(action.profileId)).pipe(
      tap((progress) => ctx.setState({ progress })),
    );
  }
}


