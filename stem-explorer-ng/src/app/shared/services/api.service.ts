import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExternalContent } from '../models/external-content';
import { User } from '../models/user';
import { Progress } from '../models/progress';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/config/config.service';
import { Region } from '../models/region';
import { Messages } from '../models/messages';
import { FeaturedLocation } from '../models/featured-location';

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
  getEntity(request: string, token?: string): Observable<any> {
    const headers: any = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.http.get(`${this.apiEndpoint}/${request}`, { headers });
  }

  getExternalContent() {
    return this.http.get<ExternalContent[]>(
      `${this.apiEndpoint}/ExternalContent`
    );
  }

  getFeaturedLocations() {
    return this.http.get<FeaturedLocation[]>(
      `${this.apiEndpoint}/Locations/Featured`
    );
  }

  getRegions() {
    return this.http.get<Region[]>('/assets/regions.json');
  }

  getMessages(): Observable<Messages> {
    return this.http.get<Messages>('/assets/messages.json');
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

  deleteProfile(token: string) {
    const headers = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return this.http.delete(
      `${this.apiEndpoint}/Profile`,
      headers
    );
  }
}
