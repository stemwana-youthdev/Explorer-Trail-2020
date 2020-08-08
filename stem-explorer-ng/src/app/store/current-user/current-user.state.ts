import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, createSelector } from '@ngxs/store';

import { User } from 'src/app/shared/models/user';
import { UpdateToken, UpdateUser } from './current-user.actions';


export interface CurrentUserStateModel {
  token: string | null;
  user: User | null;
}

const CURRENT_USER_TOKEN: StateToken<CurrentUserStateModel> = new StateToken('currentUser');

@State<CurrentUserStateModel>({
  name: CURRENT_USER_TOKEN,
  defaults: {
    token: null,
    user: null,
  },
  children: [],
})
@Injectable()
export class CurrentUserState {
  @Selector()
  public static token(state: CurrentUserStateModel): string {
    return state.token;
  }

  @Selector()
  public static user(state: CurrentUserStateModel): User {
    return state.user;
  }

  @Selector()
  public static isLoggedIn(state: CurrentUserStateModel): boolean {
    return !!state.user;
  }

  @Action(UpdateToken)
  public updateToken(ctx: StateContext<CurrentUserStateModel>, action: UpdateToken) {
    ctx.patchState({
      token: action.token,
    });
  }

  @Action(UpdateUser)
  public updateUser(ctx: StateContext<CurrentUserStateModel>, action: UpdateUser) {
    ctx.patchState({
      user: action.user,
    });
  }
}

