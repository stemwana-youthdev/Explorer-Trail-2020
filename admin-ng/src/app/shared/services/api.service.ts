import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  ) {}

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
    return this.http.put<Location>(`${url}/${location.uid}`, location);
  }

  createLocation(location: Location): Observable<Location> {
    const url = this.url.locations();
    return this.http.post<Location>(url, location);
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
    return this.http.put<Challenge>(`${url}/${challenge.id}`, challenge);
  }

  createChallenge(challenge: Challenge): Observable<Challenge> {
    const url = this.url.challenges();
    return this.http.post<Challenge>(url, challenge);
  }

  updateLevel(level: ChallengeLevel): Observable<ChallengeLevel> {
    const url = this.url.challengeLevels();
    return this.http.put<ChallengeLevel>(`${url}/${level.uid}`, level);
  }

  createLevel(level: ChallengeLevel): Observable<ChallengeLevel> {
    const url = this.url.challengeLevels();
    return this.http.post<ChallengeLevel>(url, level);
  }

  addLocation(challengeId: string, locationId): Observable<number> {
    const url = this.url.challenges();
    let params = new HttpParams();
    params = params.append('challengeId', challengeId);
    params = params.append('locationId', locationId);
    return this.http.put<number>(`${url}/add-location`, null, { params });
  }

  deleteChallenge(challengeId: string): Observable<any> {
    const url = this.url.challenges();
    return this.http.delete(`${url}/${challengeId}`);
  }

  deleteLocation(locationId: string): Observable<any> {
    const url = this.url.locations();
    return this.http.delete(`${url}/${locationId}`);
  }

  deleteLevel(levelId: string): Observable<any> {
    const url = this.url.challengeLevels();
    return this.http.delete(`${url}/${levelId}`);
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
    return this.http.post<ExternalContent>(url, item);
  }

  updateExternalContent(item: ExternalContent): Observable<ExternalContent> {
    const url = this.url.externalContent();
    return this.http.put<ExternalContent>(`${url}/${item.uid}`, item);
  }

  deleteExternalContent(itemId: string): Observable<any> {
    const url = this.url.externalContent();
    return this.http.delete(`${url}/${itemId}`);
  }
}
