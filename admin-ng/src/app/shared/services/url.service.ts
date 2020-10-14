import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class UrlService {
  configDetail: any;
  private readonly apiUrl;

  // get apiEndpoint(): string {
  //   return this.config.get('API_ENPOINT') as string;
  // }

  constructor(private config: ConfigService) {
    this.configDetail = config.getConfig();
    console.warn(this.configDetail)
    // this.apiUrl = `${this.configDetail.api_url}`;
    this.apiUrl = `http://localhost:5000/api`;
  }

  getLocations(): string {
    return `${this.apiUrl}/Locations`;
  }
}
