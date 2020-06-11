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

}
