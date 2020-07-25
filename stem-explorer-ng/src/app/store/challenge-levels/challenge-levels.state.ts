import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { ApiService } from 'src/app/shared/services/api.service';

import { LoadChallengeLevelsData } from './challenge-levels.actions';
import { ChallengeLevel } from '../../shared/models/challenge-level';


export interface ChallengeLevelsStateModel {
  challengeLevels: ChallengeLevel[];
}

const CHALLENGE_LEVELS_TOKEN: StateToken<ChallengeLevelsStateModel> = new StateToken('challengeLevels');

@State<ChallengeLevelsStateModel>({
  name: CHALLENGE_LEVELS_TOKEN,
  defaults: {
    challengeLevels: [],
  },
  children: [],
})
@Injectable()
export class ChallengeLevelsState {
  constructor(
    private apiService: ApiService,
  ) { }

  @Selector()
  public static challengeLevels(state: ChallengeLevelsStateModel): ChallengeLevel[] {
    return state.challengeLevels;
  }

  @Action(LoadChallengeLevelsData)
  public loadData({ patchState }: StateContext<ChallengeLevelsStateModel>) {
    return this.apiService.getChallengeLevels().pipe(
      tap((data) => patchState({ challengeLevels: data.challengeLevels })),
    );
  }
}
