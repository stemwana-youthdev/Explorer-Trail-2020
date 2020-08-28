import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';

@Injectable()
export class UrlService {
  private apiUrl;

  constructor(configService: ConfigService) {
    this.apiUrl = configService.get('API_ENDPOINT');
  }

  /**
   * returns the api endpoint url
   * @todo confirm this is correct when API is done
   */
  content(): string {
    return `${this.apiUrl}/content`;
  }
}
