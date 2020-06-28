import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ConfigService } from 'src/app/config/config.service';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) {}

  getChallenges() {
    return this.http
      .get(`${this.config.get('API_ENDPOINT')}/Challenge/GetChallenges`)
      .pipe(
        map((challenges: object[]) => ({ challenges })),
      );
  }

  getLocations() {
    return this.http.get('assets/locations.json');
  }
}
