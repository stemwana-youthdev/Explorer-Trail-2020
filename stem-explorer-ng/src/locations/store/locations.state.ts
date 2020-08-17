import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, createSelector } from '@ngxs/store';
import { tap, map } from 'rxjs/operators';

import { ApiService } from 'src/app/shared/services/api.service';

import { LoadLocationsData, FilterLocations } from './locations.actions';
import { Location } from '../../app/shared/models/location';


export interface LocationsStateModel {
  locations: Location[];
  fetched: boolean;
  filter: number[];
}

const LOCATIONS_TOKEN: StateToken<LocationsStateModel> = new StateToken('locations');

@State<LocationsStateModel>({
  name: LOCATIONS_TOKEN,
  defaults: {
    locations: [],
    fetched: false,
    filter: [0, 1, 2, 3]
  },
  children: [],
})
@Injectable()
export class LocationsState {
  constructor(
    private apiService: ApiService,
  ) { }

  @Selector()
  public static locations(state: LocationsStateModel): Location[] {
    return state.locations;
  }

  @Selector()
  public static locationFilter(state: LocationsStateModel): number[] {
    return state.filter;
  }

  @Action(LoadLocationsData)
  public loadData(ctx: StateContext<LocationsStateModel>) {
    const state = ctx.getState();
    if (!state.fetched) {
      return this.apiService.getLocations().pipe(
        map((data) => data.location.sort((a, b) =>
          (a.challengeTitle > b.challengeTitle) ? 1 : -1)),
        tap((data) => ctx.patchState({
          locations: data,
          fetched: true,
        })),
      );
    }
  }

  @Action(FilterLocations)
  public filterLocations(
    { patchState }: StateContext<LocationsStateModel>,
    action: FilterLocations
  ) {
    patchState({
      filter: action.filter
    });
  }
}
