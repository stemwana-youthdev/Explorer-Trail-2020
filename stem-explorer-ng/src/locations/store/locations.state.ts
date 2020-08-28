import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';
import { tap, switchMap, take, filter } from 'rxjs/operators';
import { Location } from '../models/location';
import { LocationApiService } from '../services/locations-api.service';
import { FilterLocations, LoadLocationsData } from './locations.actions';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { zip, from, of } from 'rxjs';
import { ProfilesState } from 'src/app/store/profiles/profiles.state';

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
    private apiService: LocationApiService,
    private store: Store,
    private authService: AuthService,
  ) {}

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
      return this.getActionAndProfile().pipe(
        switchMap(([token, profile]) =>
          this.apiService.getLocations(token, profile?.id)
        ),
        tap((locations) =>
          ctx.patchState({
            locations,
            fetched: true,
          })
        )
      );
    }
  }

  private getActionAndProfile() {
    return this.authService.isLoggedIn.pipe(
      take(1),
      switchMap((loggedIn) => {
        if (loggedIn) {
          return zip(
            from(this.authService.getToken()),
            this.store.select(ProfilesState.currentProfile).pipe(
              filter((profile) => !!profile),
              take(1)
            )
          );
        } else {
          return of([null, null]);
        }
      })
    );
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
