import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ConfigService } from 'src/app/config/config.service';
import { Challenge } from '../models/challenge';
import { Location } from '../models/location';
import { ExternalContent } from '../models/external-content';
import { ChallengeLevel } from '../models/challenge-level';
import { User } from '../models/user';

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

  getExternalContent() {
    return this.http.get<ExternalContent[]>(
      `${this.apiEndpoint}/ExternalContent/GetContent`
    );
  }

  getChallenge(uid: number) {
    // TODO: replace with own endpoint
    return this.getChallenges().pipe(
      map(({ challenges }) => challenges.find((c) => c.uid === uid))
    );
  }

  getChallengeLevels() {
    return this.http.get<ChallengeLevels>(
      `${this.apiEndpoint}/ChallengeLevel/GetLevels`
    );
  }

  validateAnswer(levelUid: number, answer: string) {
    return this.http.post(
      `${this.apiEndpoint}/ChallengeLevel/ValidateAnswer/${levelUid}`,
      JSON.stringify(answer),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getCurrentUser(token: string) {
    return this.http.get<User>(`${this.apiEndpoint}/User/GetCurrentUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  registerUser(token: string, userInfo: User) {
    return this.http.post<User>(
      `${this.apiEndpoint}/User/RegisterUser`,
      userInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
