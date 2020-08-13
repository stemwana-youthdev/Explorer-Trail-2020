import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

type LatLng = google.maps.LatLngLiteral;

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
}
