import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';

import { AuthService } from 'src/app/shared/auth/auth.service';

import { LoadProfiles } from './profiles.actions';
import { Profile } from 'src/app/shared/models/profile';
import { tap, switchMap, filter, take } from 'rxjs/operators';
import { from } from 'rxjs';

export interface ProfilesStateModel {
  profiles: Profile[];
  currentProfile: Profile;
  fetched: boolean;
}

const PROFILES_TOKEN: StateToken<ProfilesStateModel> = new StateToken('profiles');

@State<ProfilesStateModel>({
  name: PROFILES_TOKEN,
  defaults: {
    profiles: [],
    currentProfile: null,
    fetched: false,
  },
  children: [],
})
@Injectable()
export class ProfilesState {
  constructor(
    private authService: AuthService,
  ) { }

  @Selector()
  public static profiles(state: ProfilesStateModel): Profile[] {
    return state.profiles;
  }

  @Selector()
  public static currentProfile(state: ProfilesStateModel): Profile {
    return state.currentProfile;
  }

  @Action(LoadProfiles)
  public loadProfiles(ctx: StateContext<ProfilesStateModel>) {
    const { fetched } = ctx.getState();
    if (fetched) {
      return;
    }

    return this.authService.isLoggedIn.pipe(
      take(1),
      filter((loggedIn) => loggedIn),
      switchMap(() => from(this.authService.getProfiles())),
      tap((profiles) => {
        let { currentProfile } = ctx.getState();
        if (!profiles.some((profile) => profile.id === currentProfile?.id)) {
          currentProfile = profiles[0];
        }
        ctx.patchState({ profiles, currentProfile, fetched: true });
      })
    );
  }
}
