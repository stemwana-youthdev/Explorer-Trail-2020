import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, createSelector } from '@ngxs/store';
import { tap, map } from 'rxjs/operators';

import { ApiService } from 'src/app/shared/services/api.service';

import { LoadChallengesData, FilterChallenges } from './challenges.actions';
import { Challenge } from '../../shared/models/challenge';


export interface ChallengesStateModel {
  challenges: Challenge[];
  filter: number[];
}

const CHALLENGES_TOKEN: StateToken<ChallengesStateModel> = new StateToken('challenges');

@State<ChallengesStateModel>({
  name: CHALLENGES_TOKEN,
  defaults: {
    challenges: [],
    filter: [0, 1, 2, 3],
  },
  children: [],
})
@Injectable()
export class ChallengesState {
  constructor(
    private apiService: ApiService,
  ) { }

  @Selector()
  public static challenges(state: ChallengesStateModel): Challenge[] {
    return state.challenges;
  }

  @Selector()
  public static challengeFilter(state: ChallengesStateModel): number[] {
    return state.filter;
  }

  @Selector()
  public static challenge(state: ChallengesStateModel) {
    return createSelector(
      [ChallengesState],
      (challengeId: number): Challenge => {
        return state.challenges.find(
          (challenge) => challenge.uid === challengeId,
        );
      },
    );
  }

  @Action(LoadChallengesData)
  public loadData({ patchState }: StateContext<ChallengesStateModel>) {
    return this.apiService.getChallenges().pipe(
      map((data) => data.challenges.sort((a, b) => (a.title > b.title) ? 1 : -1)),
      tap((data) => patchState({ challenges: data })),
    );
  }

  @Action(FilterChallenges)
  public filterChallenges(
    { patchState }: StateContext<ChallengesStateModel>,
    action: FilterChallenges,
  ) {
    patchState({
      filter: action.filter,
    });
  }
}
