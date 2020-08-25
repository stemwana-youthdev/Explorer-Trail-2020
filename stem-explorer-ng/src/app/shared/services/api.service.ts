import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/config/config.service';
import { Challenge } from '../../../challenge/models/challenge';
import { ExternalContent } from '../models/external-content';
import { User } from '../models/user';
import { ChallengeLevel } from 'src/challenge/models/challenge-level';
import { Progress } from '../models/progress';
import { Profile } from '../models/profile';

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

  getEntity(request: string) {
    return this.http.get(
      `${this.apiEndpoint}/${request}`
    );
  }

  getChallenges() {
    return this.http.get<Challenge[]>(
      `${this.apiEndpoint}/Challenges`
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

  getProgress(token: string, profileId: number) {
    return this.http.get<Progress[]>(
      `${this.apiEndpoint}/Progress/${profileId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  levelCompleted(token: string, profileId, levelId: number, correct: boolean) {
    return this.http.post(
      `${this.apiEndpoint}/Progress/LevelCompleted`,
      {
        levelId,
        correct,
        profileId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  getProfiles(token: string) {
    return this.http.get<Profile[]>(
      `${this.apiEndpoint}/Profiles`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
