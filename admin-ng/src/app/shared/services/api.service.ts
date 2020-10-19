import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '../models/challenges.model';
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
    return this.http.put<Location>(`${url}/${location.id}`, location);
  }

  createLocation(location: Location): Observable<Location> {
    const url = this.url.locations();
    return this.http.post<Location>(url, location);
  }

  getChallenges(): Observable<Challenge[]> {
    const url = this.url.challenges();
    return this.http.get<Challenge[]>(url);
  }

  getChallenge(id: string): Observable<Challenge> {
    const url = this.url.challenges();
    return this.http.get<Challenge>(`${url}/${id}`);
  }

  updateChallenge(challenge: Challenge): Observable<Challenge> {
    const url = this.url.challenges();
    return this.http.put<Challenge>(`${url}/${challenge.id}`, challenge);
  }

  createChallenge(challenge: Challenge): Observable<Challenge> {
    const url = this.url.challenges();
    return this.http.post<Challenge>(url, challenge);
  }
}
