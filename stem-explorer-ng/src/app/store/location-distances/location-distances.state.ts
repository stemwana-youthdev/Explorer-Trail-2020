import { StateToken, State, Selector, createSelector, Store, StateContext, Action } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap, switchMap, map } from 'rxjs/operators';
import { combineLatest, Observable, zip } from 'rxjs';

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
  distanceMatrixService: google.maps.DistanceMatrixService;

  constructor(
    private geolocationService: GeolocationService,
    private store: Store
  ) {
    this.distanceMatrixService = new google.maps.DistanceMatrixService();
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
      return combineLatest([
        this.store.select(LocationsState.locations),
        // geolocation observables will be synchronized
        // so only fire once
        zip(this.geolocationService.location, this.isInCBD$),
      ]).pipe(
        switchMap(([locations, [geolocation, isInCBD]]) =>
          this.getDistanceMatrix({
            origins: [geolocation],
            destinations: locations.map((l) => l.position),
            travelMode: isInCBD
              ? google.maps.TravelMode.WALKING
              : google.maps.TravelMode.DRIVING,
          }).pipe(
            map((distanceMatrix) =>
              distanceMatrix.rows[0].elements.map((element, index) => ({
                locationId: locations[index].uid,
                distance: element.distance.value,
              }))
            )
          )
        ),
        tap((locationDistances) => ctx.patchState({ locationDistances }))
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

  // Observable wrapper for distanceMatrixService.getDistanceMatrix
  getDistanceMatrix(
    request: google.maps.DistanceMatrixRequest
  ): Observable<google.maps.DistanceMatrixResponse> {
    return new Observable((subscriber) => {
      this.distanceMatrixService.getDistanceMatrix(request, (response, status) => {
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