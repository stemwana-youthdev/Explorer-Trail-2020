import {
  StateToken,
  State,
  Selector,
  createSelector,
  Store,
  StateContext,
  Action,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  tap,
  map,
  filter,
  throttleTime,
  mergeAll,
  mergeMap,
} from 'rxjs/operators';
import { combineLatest, Observable, from, zip } from 'rxjs';

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

const LOCATION_DISTANCES_TOKEN: StateToken<LocationDistancesStateModel> = new StateToken(
  'locationDistances'
);

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
  throttleDelay = 10000; // 10s
  maxConcurrent = 10;

  directionsService: google.maps.DirectionsService;

  constructor(
    private geolocationService: GeolocationService,
    private store: Store
  ) {
    this.directionsService = new google.maps.DirectionsService();
  }

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
        return state.locationDistances.find((d) => d.locationId === locationId)
          ?.distance;
      }
    );
  }

  @Action(WatchLocationDistances)
  public watchLocationDistances(
    ctx: StateContext<LocationDistancesStateModel>
  ) {
    const state = ctx.getState();
    if (!state.watching) {
      ctx.patchState({ watching: true });

      // Observable of combined locations and geolocation
      const locations$ = combineLatest([
        this.store.select(LocationsState.locations),
        // Zip geolocation as they will fire in sync
        zip(this.geolocationService.location, this.isInCBD$).pipe(
          // Throttle geolocation so that we do not spam apis to much
          throttleTime(this.throttleDelay, undefined, {
            leading: true,
            trailing: true,
          })
        ),
      ]);

      const distanceUpdates$ = locations$.pipe(
        mergeMap(([locations, [geolocation, isInCBD]]) =>
          from(
            // Load each location separately
            locations.map((location) =>
              this.getRoute({
                origin: geolocation,
                destination: location.position,
                // Get the walking distance if the user is in the CBD
                travelMode: isInCBD
                  ? google.maps.TravelMode.WALKING
                  : google.maps.TravelMode.DRIVING,
              }).pipe(
                map((route) => ({
                  locationId: location.uid,
                  distance: route.routes[0].legs[0].distance.value,
                }))
              )
            )
          )
        ),
        // Only load a couple of distances at a time
        mergeAll(this.maxConcurrent)
      );

      return distanceUpdates$.pipe(
        tap((locationDistance) => {
          const oldState = ctx.getState();
          ctx.patchState({
            // Replace the old distance for this location with the new one
            locationDistances: [
              ...oldState.locationDistances.filter(
                (d) => d.locationId !== locationDistance.locationId
              ),
              locationDistance,
            ],
          });
        })
      );
    }
  }

  // CBD boundary according to
  // https://www.tauranga.govt.nz/Portals/0/data/council/roads/files/tcc_road_categories_map.pdf
  get isInCBD$() {
    const cbd = new google.maps.LatLngBounds(
      {
        lat: -37.689038,
        lng: 176.161683,
      },
      {
        lat: -37.676751,
        lng: 176.172378,
      }
    );

    return this.geolocationService.location.pipe(
      map((geolocation) => cbd.contains(geolocation))
    );
  }

  // Observable wrapper for directionsService.route
  getRoute(
    request: google.maps.DirectionsRequest
  ): Observable<google.maps.DirectionsResult> {
    return new Observable((subscriber) => {
      this.directionsService.route(request, (response, status) => {
        if (status === 'OK') {
          subscriber.next(response);
        } else {
          subscriber.error(status);
        }
        subscriber.complete();
      });
    });
  }
}
