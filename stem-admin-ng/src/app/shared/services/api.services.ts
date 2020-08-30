import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../core/config/config.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  apiEndpoint: string;

  constructor(
    private http: HttpClient,
    config: ConfigService
  ) {
    // this.apiEndpoint = config.get('API_ENDPOINT') as string;
    this.apiEndpoint = 'http://localhost:5000/api';
  }

  getEntities(url: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiEndpoint}/${url}`
    );
  }
}
