import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.get<Challenge[]>(
      `${this.apiEndpoint}/Challenge/GetChallenges`
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

  getChallengeLevels() {
    return this.http.get<ChallengeLevel[]>(
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
    return this.http.get<User>(
      `${this.apiEndpoint}/User/CurrentUser`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  registerUser(token: string, userInfo: User) {
    return this.http.post<User>(
      `${this.apiEndpoint}/User/RegisterUser`,
      userInfo,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  updateUser(token: string, userInfo: User) {
    return this.http.put<User>(
      `${this.apiEndpoint}/User/CurrentUser`,
      userInfo,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

}
