import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigService } from 'src/app/config/config.service';
import { Challenge } from '../models/challenge';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) {}

  get apiEndpoint() {
    return this.config.get('API_ENDPOINT') as string;
  }

  getChallenges() {
    return this.http.get(`${this.apiEndpoint}/Challenge/GetChallenges`) as Observable<Challenge[]>;
  }

  getLocations() {
    return this.http.get(`${this.apiEndpoint}/Location/GetLocations`) as Observable<Location[]>;
  }
}
