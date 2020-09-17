import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  /**
   * Method for getting user's current position, for displaying the user on the map
   * and for working out distance to location.
   */
  getPosition(): Promise<google.maps.LatLngLiteral> {
    return new Promise<google.maps.LatLngLiteral>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({ lat: position.coords.latitude, lng: position.coords.longitude});
      }, err => {
        reject(err);
      });
    }).catch(() => null);
  }

  /**
   * For getting where the centre of the map should be. If the user's location is in the CBD then
   * show where the user is in the CBD as the centre of the map. If the user is outside of the
   * CBD or does not have geolocation enabled in their browser, so the CBD as the centre.
   */
  getMapCentre(): Promise<google.maps.LatLngLiteral> {
    const tgaCentre: google.maps.LatLngLiteral = {
      lat: -37.6854709,
      lng: 176.1673285
    };

    return this.getPosition().then(pos => {
      const loc = {
        lat: pos.lat,
        lng: pos.lng
      };
      return loc && this.isInCBD(loc) ? loc : tgaCentre;
    }).catch(() => {
      return tgaCentre;
    });
  }

  /**
   * Method called to get the distance between user's current location and a location
   * on the map.
   * @param position the lat and lng of a map location
   * @param userPos the lat and lng of the user's current location
   */
  getDistance(
    position: google.maps.LatLngLiteral,
    userPos: google.maps.LatLngLiteral
  ): Observable<string> {
    if (!userPos) { return; }
    const route = {
      origin: userPos,
      destination: position,
      travelMode: this.isInCBD(userPos) ?
        google.maps.TravelMode.WALKING
        : google.maps.TravelMode.DRIVING
    };

    return this.getRoute(route).pipe(map(res => res.routes[0].legs[0].distance.text));
  }

  /**
   * Checks if the location is in the CBD, returns true or false.
   * @param geolocation data object of the lat and lng.
   */
  private isInCBD(geolocation: google.maps.LatLngLiteral): boolean {
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
