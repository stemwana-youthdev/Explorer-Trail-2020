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
    // this.apiUrl = `${this.configDetail.api_url}`;
    this.apiUrl = `http://localhost:5000/api`;
  }

  home(): string {
    return `${this.apiUrl}/Home`;
  }

  locations(): string {
    return `${this.apiUrl}/Locations`;
  }

  challenges(): string {
    return `${this.apiUrl}/challenges`;
  }

  challengeLevels(): string {
    return `${this.apiUrl}/challengeLevels`;
  }
}
