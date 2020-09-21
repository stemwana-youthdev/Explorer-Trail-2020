import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Location } from '../models/location';
import { LocationApiService } from '../services/locations-api.service';
import { LevelCompleted, LoadLocationsData } from './locations.actions';

export interface LocationsStateModel {
  locations: Location[];
  fetched: boolean;
}

const LOCATIONS_TOKEN: StateToken<LocationsStateModel> = new StateToken('locations');

@State<LocationsStateModel>({
  name: LOCATIONS_TOKEN,
  defaults: {
    locations: [],
    fetched: false,
  },
  children: [],
})
@Injectable()
export class LocationsState {
  constructor(
    private apiService: LocationApiService
  ) {}

  @Selector()
  public static locations(state: LocationsStateModel): Location[] {
    return state.locations;
  }

  @Action(LoadLocationsData)
  public loadData(ctx: StateContext<LocationsStateModel>) {
    const state = ctx.getState();
    if (!state.fetched) {
      const token = JSON.parse(localStorage.getItem('token'));
      const profile = JSON.parse(localStorage.getItem('profile'));
      return this.apiService.getLocations(token, profile?.id).pipe(
        tap((locations) =>
          ctx.patchState({
            locations,
            fetched: true,
          })
        )
      );
    }
  }

  @Action(LevelCompleted)
  public levelCompleted(ctx: StateContext<LocationsStateModel>, action: LevelCompleted) {
    let { locations } = ctx.getState();
    for (const location of locations) {
      for (const challenge of location.locationChallenges) {
        if (challenge.challengeId === action.challengeId) {
          const newChallenge = {
            ...challenge,
            challengeLevels: challenge.challengeLevels.map((l) =>
              l.difficulty === action.difficulty
                ? { ...l, complete: true }
                : l
            ),
          };
          const newLocation = {
            ...location,
            locationChallenges: location.locationChallenges.map((c) =>
              c === challenge ? newChallenge : c
            ),
          };
          locations = locations.map((l) => (l === location ? newLocation : l));
        }
      }
    }
    ctx.patchState({ locations });
  }
}
