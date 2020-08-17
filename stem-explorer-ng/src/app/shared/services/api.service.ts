import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Challenge } from '../models/challenge';
import { Location } from '../models/location';
import { ExternalContent } from '../models/external-content';
import { ChallengeLevel } from '../models/challenge-level';
import { ConfigService } from 'src/app/core/config/config.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
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
      `${this.apiEndpoint}/Challenge/GetChallenges`
    );
  }

  /**
   * @description gets the individual challenge
   * @param uid unique id for the challenge
   */
  getChallenge(uid: string): Observable<Challenge> {
    return this.http.get<Challenge>(
      `${this.apiEndpoint}/Challenge/${uid}`
    );
  }

  getLocations() {
    return this.http.get<Location[]>(
      `${this.apiEndpoint}/Location/GetLocations`
    );
  }

  getExternalContent() {
    return this.http.get<ExternalContent[]>(
      `${this.apiEndpoint}/ExternalContent/GetContent`
    );
  }

  // getChallenge(uid) {
  //   return this.http.get('assets/locations.json');
  // }

  getChallengeLevels() {
    return this.http.get<ChallengeLevel[]>('assets/challengeLevels.json');
  }

  validateAnswer(level: ChallengeLevel, response: string): boolean {
    let result: boolean;
    level.answer.forEach((a: string) => {
      result = a.toLowerCase().trim() === response.toLowerCase().trim();
    });

    return result;
    // TODO: replace with dedicated API call
    // return this.getChallengeLevels().pipe(
    //   map((levels) => {
    //     const level = levels.challengeLevels.find((l) => l.uid === levelUid);
    //     if (!level) {
    //       return false;
    //     }

    //     for (const possibleAnswer of level.possibleAnswers) {
    //       if (possibleAnswer.answerText.toLowerCase().trim() === answer.toLowerCase().trim()) {
    //         return possibleAnswer.isCorrect;
    //       }
    //     }

    //     return false;
    //   }),
    // );
  }

}
