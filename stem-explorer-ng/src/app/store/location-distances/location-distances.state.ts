import { StateToken, State, Selector, createSelector, Store, StateContext, Action } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { flatMap, map, tap, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { GeolocationService } from 'src/app/shared/services/geolocation.service';

import { LocationsState } from '../locations/locations.state';
import { WatchLocationDistances } from './location-distances.actions';

export interface LocationDistance {
  locationId: number;
  distance: number;
}

export interface LocationDistancesStateModel {
  locationDistances: LocationDistance[];
  watching: boolean;
}

const LOCATION_DISTANCES_TOKEN: StateToken<LocationDistancesStateModel> = new StateToken('locationDistances');

@State<LocationDistancesStateModel>({
  name: LOCATION_DISTANCES_TOKEN,
  defaults: {
    locationDistances: [],
    watching: false,
  },
  children: [],
})
@Injectable()
export class LocationDistancesState {
  constructor(
    private geolocationService: GeolocationService,
    private store: Store
  ) {}

  @Selector()
  public static locationDistances(
    state: LocationDistancesStateModel
  ): LocationDistance[] {
    return state.locationDistances;
  }

  @Selector()
  public static locationDistance(state: LocationDistancesStateModel) {
    return createSelector(
      [LocationsState, LocationDistancesState],
      (locationId: number) => {
        return state.locationDistances.find((d) => d.locationId === locationId)?.distance;
      }
    );
  }

  @Action(WatchLocationDistances)
  public watchLocationDistances(
    ctx: StateContext<LocationDistancesStateModel>
  ) {
    const state = ctx.getState();
    if (!state.watching) {
      return this.store.select(LocationsState.locations).pipe(
        switchMap((locations) => {
          return combineLatest(
            locations.map((location) => {
              return this.geolocationService
                .distanceTo(location.position)
                .pipe(
                  map((distance) => ({ distance, locationId: location.uid }))
                );
            })
          );
        }),
        tap((locationDistances) => ctx.patchState({ locationDistances }))
      );
    }
  }
}
