import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ChallengeLevel } from '../models/challenge-level.model';
import { Challenge } from '../models/challenges.model';
import { Dropdown } from '../models/dropdown.model';
import { ExternalContent } from '../models/external-content.model';
import { Location } from '../models/locations.model';
import { Stats } from '../models/stats.model';
import { UrlService } from './url.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private url: UrlService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  withAuth<T>(
    cb: (headers: { Authorization: string }) => Observable<T>
  ): Observable<T> {
    return this.auth.token.pipe(
      take(1),
      switchMap((token) => cb({ Authorization: `Bearer ${token}` }))
    );
  }

  getIsAdmin(): Observable<boolean> {
    const url = this.url.admin();
    return this.withAuth((headers) => {
      return this.http.get<boolean>(`${url}/UserIsAdmin`, { headers });
    });
  }

  getStats(): Observable<Stats> {
    const url = this.url.home();
    return this.http.get<Stats>(`${url}/Stats`);
  }

  getLocations(): Observable<Location[]> {
    const url = this.url.locations();
    return this.http.get<Location[]>(url);
  }

  getLocation(id: string): Observable<Location> {
    const url = this.url.locations();
    return this.http.get<Location>(`${url}/${id}`);
  }

  updateLocation(location: Location): Observable<Location> {
    const url = this.url.locations();
    return this.withAuth((headers) => {
      return this.http.put<Location>(`${url}/${location.uid}`, location, {
        headers,
      });
    });
  }

  createLocation(location: Location): Observable<Location> {
    const url = this.url.locations();
    return this.withAuth((headers) => {
      return this.http.post<Location>(url, location, { headers });
    });
  }

  getLocationsDropdown(): Observable<Dropdown[]> {
    const url = this.url.locations();
    return this.http.get<Dropdown[]>(`${url}/dropdown`);
  }

  getChallenges(): Observable<Challenge[]> {
    const url = this.url.challenges();
    return this.http.get<Challenge[]>(url);
  }

  getChallenge(id: string): Observable<Challenge> {
    const url = this.url.challenges();
    return this.http.get<Challenge>(`${url}/${id}`);
  }

  getLevel(id: string): Observable<ChallengeLevel> {
    const url = this.url.challengeLevels();
    return this.http.get<ChallengeLevel>(`${url}/${id}`);
  }

  updateChallenge(challenge: Challenge): Observable<Challenge> {
    const url = this.url.challenges();
    return this.withAuth((headers) => {
      return this.http.put<Challenge>(`${url}/${challenge.id}`, challenge, {
        headers,
      });
    });
  }

  createChallenge(challenge: Challenge): Observable<Challenge> {
    const url = this.url.challenges();
    return this.withAuth((headers) => {
      return this.http.post<Challenge>(url, challenge, { headers });
    });
  }

  updateLevel(level: ChallengeLevel): Observable<ChallengeLevel> {
    const url = this.url.challengeLevels();
    return this.withAuth((headers) => {
      return this.http.put<ChallengeLevel>(`${url}/${level.uid}`, level, {
        headers,
      });
    });
  }

  createLevel(level: ChallengeLevel): Observable<ChallengeLevel> {
    const url = this.url.challengeLevels();
    return this.withAuth((headers) => {
      return this.http.post<ChallengeLevel>(url, level, { headers });
    });
  }

  addLocation(challengeId: string, locationId): Observable<number> {
    const url = this.url.challenges();
    let params = new HttpParams();
    params = params.append('challengeId', challengeId);
    params = params.append('locationId', locationId);
    return this.withAuth((headers) => {
      return this.http.put<number>(`${url}/add-location`, null, {
        params,
        headers,
      });
    });
  }

  deleteChallenge(challengeId: string): Observable<any> {
    const url = this.url.challenges();
    return this.withAuth((headers) => {
      return this.http.delete(`${url}/${challengeId}`, { headers });
    });
  }

  deleteLocation(locationId: string): Observable<any> {
    const url = this.url.locations();
    return this.withAuth((headers) => {
      return this.http.delete(`${url}/${locationId}`, { headers });
    });
  }

  deleteLevel(levelId: string): Observable<any> {
    const url = this.url.challengeLevels();
    return this.withAuth((headers) => {
      return this.http.delete(`${url}/${levelId}`, { headers });
    });
  }

  getExternalContent(): Observable<ExternalContent[]> {
    const url = this.url.externalContent();
    return this.http.get<ExternalContent[]>(url);
  }

  getExternalContentItem(itemId: string): Observable<ExternalContent> {
    const url = this.url.externalContent();
    return this.http.get<ExternalContent>(`${url}/${itemId}`);
  }

  createExternalContent(item: ExternalContent): Observable<ExternalContent> {
    const url = this.url.externalContent();
    return this.withAuth((headers) => {
      return this.http.post<ExternalContent>(url, item, { headers });
    });
  }

  updateExternalContent(item: ExternalContent): Observable<ExternalContent> {
    const url = this.url.externalContent();
    return this.withAuth((headers) => {
      return this.http.put<ExternalContent>(`${url}/${item.uid}`, item, {
        headers,
      });
    });
  }

  deleteExternalContent(itemId: string): Observable<any> {
    const url = this.url.externalContent();
    return this.withAuth((headers) => {
      return this.http.delete(`${url}/${itemId}`, { headers });
    });
  }
}
