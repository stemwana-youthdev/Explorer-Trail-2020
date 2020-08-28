import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from '../models/location';

@Injectable({ providedIn: 'root' })
export class LocationApiService {

  constructor(
    private api: ApiService,
    private http: HttpClient
  ) {}

  /**
   * GET all locations
   */
  getLocations(token?: string, profileId?: number): Observable<Location[]> {
    const headers: any = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return this.http.get<Location[]>(
      `${this.api.apiEndpoint}/Locations${profileId ? `?profileId=${profileId}` : ''}`,
      { headers },
    );
  }
}
