import { Injectable } from '@angular/core';
import { ReplaySubject, zip, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Location } from '../models/location';

export const google = window.google;
export type LatLng = google.maps.LatLngLiteral;

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  geolocation$ = new ReplaySubject<LatLng>(1);

  private directionsService: google.maps.DirectionsService;

  constructor() {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      this.geolocation$.complete();
      return;
    }

    navigator.geolocation.watchPosition(
      (position) => {
        this.geolocation$.next({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn(error);
        this.geolocation$.complete();
      }
    );

    this.directionsService = new google.maps.DirectionsService();
  }

  locationDistance(location: Location): Observable<number> {
    return zip(this.geolocation$, this.isInCBD$).pipe(
      switchMap(([geolocation, isInCBD]) =>
        this.getRoute({
          origin: geolocation,
          destination: location.position,
          // Get the walking distance if the user is in the CBD
          travelMode: isInCBD
            ? google.maps.TravelMode.WALKING
            : google.maps.TravelMode.DRIVING,
        })
      ),
      map(
        (directionsResult) => directionsResult.routes[0].legs[0].distance.value
      )
    );
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

    return this.geolocation$.pipe(
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
