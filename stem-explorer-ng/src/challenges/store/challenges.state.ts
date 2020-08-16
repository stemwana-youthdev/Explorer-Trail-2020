import { Injectable } from '@angular/core';
import { Action, createSelector, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Challenge } from 'src/app/shared/models/challenge';
import { ApiService } from 'src/app/shared/services/api.service';
import { AddChallenge } from './challenge.actions';

export interface ChallengeStateModel {
  challenges: Challenge[];
  fetched: boolean;
}

const CHALLENGES_TOKEN: StateToken<ChallengeStateModel> = new StateToken('challenge');

@State<ChallengeStateModel>({
  name: CHALLENGES_TOKEN,
  defaults: {
    challenges: [],
    fetched: false
  },
  children: [],
})
@Injectable()
export class ChallengeState {
  constructor(
    private apiService: ApiService,
  ) { }

  @Selector()
  public static challenges(state: ChallengeStateModel): Challenge[] {
    return state.challenges;
  }

  @Selector()
  public static challenge(state: ChallengeStateModel) {
    return createSelector(
      [ChallengeState],
      (challengeId: number): Challenge => {
        return state.challenges.find(
          (challenge) => challenge.uid === challengeId,
        );
      },
    );
  }

  @Action(AddChallenge)
  public addChallenge(ctx: StateContext<ChallengeStateModel>, id: string) {
    return this.apiService.getChallenge(id).pipe(
      tap((data) => {
        const challenges = ctx.getState().challenges;
        ctx.patchState({
          challenges: [...challenges, data],
          fetched: true
        });
      })
    );

    // const state = ctx.getState();
    // if (!state.fetched) {
    //   return this.apiService.getChallenges().pipe(
    //     map((data) => data.challenges.sort((a, b) => (a.title > b.title) ? 1 : -1)),
    //     tap((data) => ctx.patchState({
    //       challenges: data,
    //       fetched: true,
    //     })),
    //   );
    // }
  }
}
