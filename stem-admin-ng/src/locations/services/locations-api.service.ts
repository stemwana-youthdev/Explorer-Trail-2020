import { Injectable } from '@angular/core';
import { ApiService } from '../../app/shared/services/api.services';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({ providedIn: 'root' })
export class LocationsApiService {
  constructor(private api: ApiService) {}

  getLocations(): Observable<Location[]> {
    return this.api.getEntities('Locations');
  }
}
