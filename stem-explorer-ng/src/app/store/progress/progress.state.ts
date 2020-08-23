import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';

import { AuthService } from 'src/app/shared/auth/auth.service';

import { LoadProgress } from './progress.actions';
import { Progress, CompletedLevel } from 'src/app/shared/models/progress';
import { tap } from 'rxjs/operators';
import { from } from 'rxjs';


const PROGRESS_TOKEN: StateToken<Progress> = new StateToken('progress');

@State<Progress>({
  name: PROGRESS_TOKEN,
  defaults: {
    challengeId: null,
    completedLevels: [],
  },
  children: [],
})
@Injectable()
export class ProgressState {
  constructor(
    private authService: AuthService,
  ) { }

  @Selector()
  public static completedLevels(state: Progress): CompletedLevel[] {
    return state.completedLevels;
  }

  @Action(LoadProgress)
  public loadProgress(ctx: StateContext<Progress>, action: LoadProgress) {
    return from(this.authService.getProgress(action.challengeId)).pipe(
      tap((progress) => ctx.setState(progress)),
    );
  }
}


