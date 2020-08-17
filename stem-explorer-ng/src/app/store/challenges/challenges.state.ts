import { Injectable } from '@angular/core';
import { Action, createSelector, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { map, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { Challenge } from '../../shared/models/challenge';
import { LoadChallengesData } from './challenges.actions';

export interface ChallengesStateModel {
  challenges: Challenge[];
  fetched: boolean;
}

const CHALLENGES_TOKEN: StateToken<ChallengesStateModel> = new StateToken('challenges');

@State<ChallengesStateModel>({
  name: CHALLENGES_TOKEN,
  defaults: {
    challenges: [],
    fetched: false,
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
  public loadData(ctx: StateContext<ChallengesStateModel>) {
    const state = ctx.getState();
    if (!state.fetched) {
      return this.apiService.getChallenges().pipe(
        map((data) => data.challenges.sort((a, b) => (a.title > b.title) ? 1 : -1)),
        tap((data) => ctx.patchState({
          challenges: data,
          fetched: true,
        })),
      );
    }
  }
}
