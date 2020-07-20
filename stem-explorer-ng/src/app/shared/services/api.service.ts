import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigService } from 'src/app/config/config.service';
import { Challenge } from '../models/challenge';
import { Location } from '../models/location';
import { ExternalContent } from '../models/external-content';

@Injectable()
export class ApiService {
  get apiEndpoint() {
    return this.config.get('API_ENDPOINT') as string;
  }

  testApi = `https://localhost:44382/api`;

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
      `${this.testApi}/Location/GetLocations`
      // `${this.apiEndpoint}/Location/GetLocations`
    );
  }

  getLocationById(id: string) {
    return this.http.get<any>(
      `${this.testApi}/Location/${id}`
    );
  }

  getExternalContent() {
    return this.http.get<ExternalContent[]>(
      `${this.apiEndpoint}/ExternalContent/GetContent`
    );
  }

  getChallenge(uid) {
    return this.http.get('assets/locations.json');
  }

  getChallengeLevels() {
    return this.http.get('assets/challengeLevels.json');
  }

}

export interface Challenges {
  challenges: Challenge[];
}

export interface Locations {
  location: Location[];
}
