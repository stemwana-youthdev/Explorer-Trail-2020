import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';

import { AuthService } from 'src/app/shared/auth/auth.service';

import { WatchProfiles } from './profiles.actions';
import { Profile } from 'src/app/shared/models/profile';
import { tap, switchMap, filter } from 'rxjs/operators';
import { from } from 'rxjs';

export interface ProfilesStateModel {
  profiles: Profile[];
  currentProfile: Profile;
  watching: boolean;
}

const PROFILES_TOKEN: StateToken<ProfilesStateModel> = new StateToken('profiles');

@State<ProfilesStateModel>({
  name: PROFILES_TOKEN,
  defaults: {
    profiles: [],
    currentProfile: null,
    watching: false,
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

  @Action(WatchProfiles)
  public watchProfiles(ctx: StateContext<ProfilesStateModel>) {
    const { watching } = ctx.getState();
    if (watching) {
      return;
    }
    ctx.patchState({ watching: true });

    return this.authService.isLoggedIn.pipe(
      filter((loggedIn) => loggedIn),
      switchMap(() => from(this.authService.getProfiles())),
      tap((profiles) => {
        let { currentProfile } = ctx.getState();
        if (!profiles.some((profile) => profile.id === currentProfile?.id)) {
          currentProfile = profiles[0];
        }
        ctx.patchState({ profiles, currentProfile });
      })
    );
  }
}
