import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, createSelector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { ApiService } from 'src/app/shared/services/api.service';

import { LoadChallengeLevelsData } from './challenge-levels.actions';
import { ChallengeLevel } from '../../shared/models/challenge-level';


export interface ChallengeLevelsStateModel {
  challengesLevels: ChallengeLevel[];
}

const CHALLENGE_LEVELS_TOKEN: StateToken<ChallengeLevelsStateModel> = new StateToken('challengeLevels');

@State<ChallengeLevelsStateModel>({
  name: CHALLENGE_LEVELS_TOKEN,
  defaults: {
    challengesLevels: [],
  },
  children: [],
})
@Injectable()
export class ChallengeLevelsState {
  constructor(
    private apiService: ApiService,
  ) { }

  @Selector()
  public static challengesLevels(state: ChallengeLevelsStateModel): ChallengeLevel[] {
    return state.challengesLevels;
  }

  @Selector()
  public static challengeLevels(state: ChallengeLevelsStateModel) {
    return createSelector(
      [ChallengeLevelsState],
      (challengeId: number): ChallengeLevel[] => {
        return state.challengesLevels.filter(
          (challengeLevel) => challengeLevel.challengeId === challengeId,
        );
      },
    );
  }

  @Action(LoadChallengeLevelsData)
  public loadData({ patchState }: StateContext<ChallengeLevelsStateModel>) {
    return this.apiService.getChallengeLevels().pipe(
      tap((challengesLevels) => patchState({ challengesLevels })),
    );
  }
}
