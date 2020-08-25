import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type LatLng = google.maps.LatLngLiteral;

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  currentLocation: google.maps.LatLngLiteral;

  constructor() {}

  /**
   * Gets the users current location. Checks if the user has geolocation enabled in browser, if true then gets the users current location
   * and then checks if the user is in the CBD. If the user is not in the CBD, we want the centre of the map to be in the CBD instead
   * of where the user might be (as could be anywhere in the country).
   */
  getCurrentLocation(): google.maps.LatLngLiteral {
    const tgaCentre: google.maps.LatLngLiteral = {
      lat: -37.6854709,
      lng: 176.1673285
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }

    return this.currentLocation && this.isInCBD(this.currentLocation) ? this.currentLocation : tgaCentre;
  }

  /**
   * Checks if the location is in the CBD, returns true or false.
   * @param geolocation data object of the lat and lng.
   */
  isInCBD(geolocation: google.maps.LatLngLiteral): boolean {
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
    return geolocation ? cbd.contains(geolocation) : false;
  }

  /**
   * Method called to get the distance between user's current location and a location 
   * on the map.
   * @param position the lat and lng of a map location
   */
  getDistance(position: google.maps.LatLngLiteral): Observable<string> {
    if (!this.currentLocation) { return; }
    const route = {
      origin: this.currentLocation,
      destination: position,
      travelMode: this.isInCBD(this.currentLocation) ?
        google.maps.TravelMode.WALKING
        : google.maps.TravelMode.DRIVING
    };

    return this.getRoute(route).pipe(map(res => res.routes[0].legs[0].distance.text));
  }

  /**
   * Observable wrapper for directionsService route
   * @param route the directions request stating origin, destination, and travel mode
   */
  private getRoute(
    route: google.maps.DirectionsRequest
  ): Observable<google.maps.DirectionsResult> {
    const directionsService = new google.maps.DirectionsService();

    return new Observable((subscriber) => {
      directionsService.route(route, (response, status) => {
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
