import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/config/config.service';
import { Challenge } from 'src/app/shared/models/challenge';
import { ChallengeLevel } from 'src/app/shared/models/challenge-level';

@Injectable({ providedIn: 'root' })
export class ChallengesApiService {
  apiEndpoint = this.config.get('API_ENDPOINT');

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) {}

  /**
   * @description endpoint to load the individual challenges
   * @param uid unique id for the challenge
   */
  getChallenge(uid: number): Observable<Challenge> {
    return this.http.get<Challenge>(
      `${this.apiEndpoint}/Challenge/${uid}`
    );
  }

  /**
   * @description endpoint to get the challenge levels
   * @param uid unique id for the challenge
   */
  getChallengeLevels(uid: number) {
    return this.http.get<ChallengeLevel[]>('assets/challengeLevels.json');
  }

  /**
   * Temp method for checking the answer.
   * @todo get API endpoint for this.
   * @param level level object
   * @param answer user's answer to challenge
   */
  putAnswer(level: ChallengeLevel, answer: string) {
    let result: boolean;
    level.answer.forEach((a: string) => {
      result = a.toLowerCase().trim() === answer.toLowerCase().trim();
    });
    return result;
  }
}
