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
  token: string | null = null;

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

  private get authOptions(): { headers: { Authorization: string } } {
    const token = this.token;

    if (!token) {
      throw new Error('This API requires that the user is logged in');
    }

    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  getCurrentUser() {
    return this.http.get<User>(
      `${this.apiEndpoint}/User/CurrentUser`,
      this.authOptions
    );
  }

  registerUser(userInfo: User) {
    return this.http.post<User>(
      `${this.apiEndpoint}/User/RegisterUser`,
      userInfo,
      this.authOptions
    );
  }

  // userInfo needs to have all of its properties set,
  // or they will be set to null in the DB.
  // Usually this will be a copy of CurrentUser.user with
  // the properties you want to update
  updateCurrentUser(userInfo: User) {
    return this.http.put<User>(
      `${this.apiEndpoint}/User/CurrentUser`,
      userInfo,
      this.authOptions,
    );
  }
}
