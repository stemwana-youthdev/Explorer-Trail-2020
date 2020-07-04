import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';

import { ConfigService } from 'src/app/config/config.service';
import { Challenge } from '../models/challenge';
import { Location } from '../models/location';
import { environment } from 'src/environments/environment';
import { flatMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private readonly useApiFallback: Observable<boolean>;

  get apiEndpoint() {
    return this.config.get('API_ENDPOINT') as string;
  }

  constructor(private http: HttpClient, private config: ConfigService) {
    const subject = new ReplaySubject<boolean>(1);
    if (!environment.production) {
      this.http
        .get(`${this.apiEndpoint}/Home/HealthCheck`, { responseType: 'text' })
        .subscribe({
          next() {
            subject.next(false);
          },
          error() {
            console.warn('Could not connect to api, using assets.');
            subject.next(true);
          },
        });
    } else {
      subject.next(false);
    }
    this.useApiFallback = subject;
  }

  withApiFallback<T>(
    action: (fallback: boolean) => Observable<T>
  ): Observable<T> {
    return this.useApiFallback.pipe(flatMap(action));
  }

  getChallenges() {
    return this.withApiFallback((fallback) => {
      if (fallback) {
        return this.http.get('/assets/challenges.json') as Observable<
          Challenges
        >;
      } else {
        return this.http.get(
          `${this.apiEndpoint}/Challenge/GetChallenges`
        ) as Observable<Challenges>;
      }
    });
  }

  getLocations() {
    return this.withApiFallback((fallback) => {
      if (fallback) {
        return this.http.get('/assets/locations.json') as Observable<Locations>;
      } else {
        return this.http.get(
          `${this.apiEndpoint}/Location/GetLocations`
        ) as Observable<Locations>;
      }
    });
  }
}

export interface Challenges {
  challenges: Challenge[];
}

export interface Locations {
  location: Location[];
}
