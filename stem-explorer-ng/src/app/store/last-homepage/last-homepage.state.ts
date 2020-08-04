import { State, StateToken, Selector, StateContext, Action } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { VisitedHomepage } from './last-homepage.actions';

export interface LastHomepageStateModel {
  lastHomepage: string;
}

const LAST_HOMEPAGE_TOKEN: StateToken<LastHomepageStateModel> = new StateToken('lastHomepage');

@State<LastHomepageStateModel>({
  name: LAST_HOMEPAGE_TOKEN,
  defaults: {
    lastHomepage: '/',
  },
  children: [],
})
@Injectable()
export class LastHomepageState {
  constructor(
    private router: Router,
  ) { }

  @Selector()
  public static lastHomepage(state: LastHomepageStateModel) {
    return state.lastHomepage;
  }

  @Action(VisitedHomepage)
  public visitedHomepage(ctx: StateContext<LastHomepageStateModel>) {
    const url = this.router.url;
    ctx.patchState({
      lastHomepage: url,
    });
  }
}
