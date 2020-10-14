import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/locations.model';
import { UrlService } from './url.service';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(
    private url: UrlService,
    private http: HttpClient,
  ) {}

  getLocations(): Observable<Location[]> {
    const url = this.url.getLocations();
    return this.http.get<Location[]>(url);
  }
}
