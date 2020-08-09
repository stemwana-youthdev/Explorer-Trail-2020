import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';

import { ApiService } from 'src/app/shared/services/api.service';

import { LoadProgress } from './progress.actions';
import { Progress, CompletedLevel } from 'src/app/shared/models/progress';
import { tap } from 'rxjs/operators';


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
    private apiService: ApiService,
  ) { }

  @Selector()
  public static completedLevels(state: Progress): CompletedLevel[] {
    return state.completedLevels;
  }

  @Action(LoadProgress)
  public updateUser(ctx: StateContext<Progress>, action: LoadProgress) {
    return this.apiService.getProgress(action.challengeId).pipe(
      tap((progress) => ctx.setState(progress)),
    );
  }
}


