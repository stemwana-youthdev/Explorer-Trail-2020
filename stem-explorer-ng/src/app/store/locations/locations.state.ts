import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, createSelector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { ApiService } from 'src/app/shared/services/api.service';

import { LoadLocationsData } from './locations.actions';
import { Location } from '../../shared/models/location';


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
    private apiService: ApiService,
  ) { }

  @Selector()
  public static challengeLocation(state: LocationsStateModel) {
    return createSelector(
      [LocationsState],
      (challengeId: number): Location => {
        return state.locations.find(
          (location) => location.challengeId === challengeId,
        );
      },
    );
  }

  @Selector()
  public static locations(state: LocationsStateModel): Location[] {
    return state.locations;
  }

  @Selector()
  public static location(state: LocationsStateModel) {
    return createSelector(
      [LocationsState],
      (uid: number): Location => {
        return state.locations.find(
          (location) => location.uid === uid,
        );
      },
    );
  }

  @Action(LoadLocationsData)
  public loadData(ctx: StateContext<LocationsStateModel>) {
    const state = ctx.getState();
    if (!state.fetched) {
      return this.apiService.getLocations().pipe(
        tap((locations) => ctx.patchState({
          locations,
          fetched: true,
        })),
      );
    }
  }
}
