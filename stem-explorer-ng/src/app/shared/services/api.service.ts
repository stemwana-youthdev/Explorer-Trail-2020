import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ConfigService } from 'src/app/config/config.service';
import { Challenge } from '../models/challenge';
import { Location } from '../models/location';
import { ExternalContent } from '../models/external-content';
import { ChallengeLevel } from '../models/challenge-level';
import { User } from '../models/user';
import { Store } from '@ngxs/store';
import { CurrentUserState } from 'src/app/store/current-user/current-user.state';

@Injectable()
export class ApiService {
  get apiEndpoint() {
    return this.config.get('API_ENDPOINT') as string;
  }

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private store: Store
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

  private get authOptions(): { headers: { Authorization: string } } {
    const token = this.store.selectSnapshot(CurrentUserState.token);

    if (!token) {
      throw new Error('This API requires that the user is logged in');
    }

    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  getCurrentUser() {
    return this.http.get<User>(
      `${this.apiEndpoint}/User/GetCurrentUser`,
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
