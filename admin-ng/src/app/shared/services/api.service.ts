import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChallengeLevel } from '../models/challenge-level.model';
import { Challenge } from '../models/challenges.model';
import { Dropdown } from '../models/dropdown.model';
import { Location } from '../models/locations.model';
import { UrlService } from './url.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private url: UrlService,
    private http: HttpClient,
  ) {}

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
    return this.http
      .get<ChallengeLevel[]>(`${url}`)
      .pipe(map((levels) => levels[0]));
  }

  updateChallenge(challenge: Challenge): Observable<Challenge> {
    const url = this.url.challenges();
    return this.http.put<Challenge>(`${url}/${challenge.id}`, challenge);
  }

  createChallenge(challenge: Challenge): Observable<Challenge> {
    const url = this.url.challenges();
    return this.http.post<Challenge>(url, challenge);
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
}
