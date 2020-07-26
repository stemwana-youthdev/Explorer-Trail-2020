import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

export const google = window.google;
export type LatLng = google.maps.LatLngLiteral;

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  location = new ReplaySubject<LatLng>(1);

  constructor() {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      this.location.complete();
      return;
    }

    navigator.geolocation.watchPosition(
      (position) => {
        this.location.next({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn(error);
        this.location.complete();
      }
    );
  }

  distanceTo(location: LatLng) {
    return this.location.pipe(
      map((geolocation) =>
        google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(geolocation),
          new google.maps.LatLng(location)
        )
      )
    );
  }
}
