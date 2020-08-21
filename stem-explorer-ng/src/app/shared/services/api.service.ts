import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigService } from 'src/app/config/config.service';
import { Challenge } from '../models/challenge';
import { Location } from '../models/location';
import { ExternalContent } from '../models/external-content';
import { ChallengeLevel } from '../models/challenge-level';

// With the api server running, go to
// http://localhost:5000/swagger
// to view the basic swagger api docs.
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
    return this.http.get<Challenge[]>(
      `${this.apiEndpoint}/Challenges`
    );
  }

  getLocations() {
    return this.http.get<Location[]>(
      `${this.apiEndpoint}/Locations`
    );
  }

  getExternalContent() {
    return this.http.get<ExternalContent[]>(
      `${this.apiEndpoint}/ExternalContent`
    );
  }

  getChallengeLevels() {
    return this.http.get<ChallengeLevel[]>(
      `${this.apiEndpoint}/ChallengeLevels`
    );
  }

  validateAnswer(levelUid: number, answer: string) {
    return this.http.post(
      `${this.apiEndpoint}/ChallengeLevels/${levelUid}/ValidateAnswer`,
      JSON.stringify(answer),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

}
