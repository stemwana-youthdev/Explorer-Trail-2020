  
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from '../models/location';

@Injectable({ providedIn: 'root' })
export class LocationApiService {
  apiEndpoint: string;

  constructor(
    private api: ApiService,
    private http: HttpClient
  ) {
    this.apiEndpoint = api.apiEndpoint;
  }

  /**
   * GET all locations
   */
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(
      `${this.api.apiEndpoint}/Locations`
    );
  }
}