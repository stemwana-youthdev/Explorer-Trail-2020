import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigService } from 'src/app/config/config.service';
import { Challenge } from '../models/challenge';
import { Location } from '../models/location';

@Injectable()
export class ApiService {
  private useApiFallback = true;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) {}

  get apiEndpoint() {
    return this.config.get('API_ENDPOINT') as string;
  }

  getChallenges() {
    if (this.useApiFallback) {
      return this.http.get('/assets/challenges.json') as Observable<Challenges>;
    } else {
      return this.http.get(`${this.apiEndpoint}/Challenge/GetChallenges`) as Observable<Challenges>;
    }
  }

  getLocations() {
    if (this.useApiFallback) {
      return this.http.get('/assets/locations.json') as Observable<Locations>;
    } else {
      return this.http.get(`${this.apiEndpoint}/Location/GetLocations`) as Observable<Locations>;
    }
  }
}

export interface Challenges {
  challenges: Challenge[];
}

export interface Locations {
  location: Location[];
}
