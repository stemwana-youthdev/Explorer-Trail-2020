import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigService } from 'src/app/config/config.service';
import { Challenge } from '../models/challenge';
import { Location } from '../models/location';

@Injectable()
export class ApiService {
  get apiEndpoint() {
    return this.config.get('API_ENDPOINT') as string;
  }

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) {}

  getChallenges() {
    return this.http.get<Challenges>(
      `${this.apiEndpoint}/Challenge/GetChallenges`
    );
  }

  getLocations() {
    return this.http.get<Locations>(
      `${this.apiEndpoint}/Location/GetLocations`
    );
  }

  getChallenge(uid) {
    return this.http.get('assets/locations.json');
  }
}

export interface Challenges {
  challenges: Challenge[];
}

export interface Locations {
  location: Location[];
}
