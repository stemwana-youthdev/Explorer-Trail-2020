import { Component } from '@angular/core';
import { ConfigService } from './config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stem-explorer-ng';

  constructor(
    private configService: ConfigService,
  ) { }

  // This is just a demonstration that the config service works
  // Please inject it in api service or similar to call api calls
  // or wherever you need to use env variables.
  // For local development, set env vars in src/env.js file.
  // For production or running in docker, set is as env variable
  // for docker container.
  get apiEndpoint(): string {
    return this.configService.get<string>('API_ENDPOINT');
  }
}
