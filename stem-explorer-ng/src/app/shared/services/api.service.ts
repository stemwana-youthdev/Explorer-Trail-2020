import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ConfigService } from 'src/app/config/config.service';
import { Challenge } from '../models/challenge';
import { Location } from '../models/location';
import { ExternalContent } from '../models/external-content';
import { ChallengeLevel } from '../models/challenge-level';

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
      // `${this.apiEndpoint}/Challenge/GetChallenges`
      `${this.testApi}/Challenge/GetChallenges`
    );
  }

  getChallengeById(id: string) {
    return this.http.get(`${this.testApi}/Challenge/${id}`);
    // return this.http.get('assets/locations.json');
  }

  getLocations() {
    return this.http.get<Location[]>(
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
      `${this.testApi}/ExternalContent/GetContent`
      // `${this.apiEndpoint}/ExternalContent/GetContent`
    );
  }

  getChallengeLevels() {
    return this.http.get<ChallengeLevels>('assets/challengeLevels.json');
  }

  validateAnswer(levelUid: number, answer: string) {
    // TODO: replace with dedicated API call
    return this.getChallengeLevels().pipe(
      map((levels) => {
        const level = levels.challengeLevels.find((l) => l.uid === levelUid);
        if (!level) {
          return false;
        }

        for (const possibleAnswer of level.possibleAnswers) {
          if (possibleAnswer.answerText.toLowerCase().trim() === answer.toLowerCase().trim()) {
            return possibleAnswer.isCorrect;
          }
        }

        return false;
      }),
    );
  }

}

export interface Challenges {
  challenges: Challenge[];
}

export interface Locations {
  location: Location[];
}

export interface ChallengeLevels {
  challengeLevels: ChallengeLevel[];
}
