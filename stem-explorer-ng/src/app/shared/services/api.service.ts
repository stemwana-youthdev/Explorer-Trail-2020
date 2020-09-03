import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExternalContent } from '../models/external-content';
import { User } from '../models/user';
import { Progress } from '../models/progress';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/config/config.service';

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

  /**
   * Method to get any entities.
   * @param request the API request string, i.e. 'locations'
   */
  getEntity(request: string): Observable<any> {
    return this.http.get(
      `${this.apiEndpoint}/${request}`
    );
  }

  getExternalContent() {
    return this.http.get<ExternalContent[]>(
      `${this.apiEndpoint}/ExternalContent`
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

  registerUser(token: string, profileInfo: Profile) {
    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };

    return this.http.post<User>(
      `${this.apiEndpoint}/User/RegisterUser`,
      profileInfo,
      headers
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

  /** Profile Endpoints */

  getProfile(token: string, userId: string) {
    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };

    return this.http.get<Profile>(
      `${this.apiEndpoint}/Profile?userId=${userId}`,
      headers
    );
  }

  createProfile(profile: Profile, token?: string) {
    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };

    return this.http.post<Profile>(
      `${this.apiEndpoint}/Profile`,
      profile,
      headers
    );
  }

  updateProfile(token: string, profile: Profile) {
    const headers = {
      headers: { Authorization: `Bearer ${token}` }
    };

    return this.http.put<Profile>(
      `${this.apiEndpoint}/Profile/Update`,
      profile,
      headers
    );
  }
}
