import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export type LatLng = google.maps.LatLngLiteral;

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  location = new ReplaySubject<LatLng>(1);

  constructor() {
    if (!navigator.geolocation) {
      this.location.error('Geolocation not supported');
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
        this.location.error(error);
      }
    );
  }
}
