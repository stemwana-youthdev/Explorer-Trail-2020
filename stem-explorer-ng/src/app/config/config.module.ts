import { NgModule } from '@angular/core';

import { ConfigService } from './config.service';
import { FirebaseConfigService, ConfiguredAngularFireModule } from './firebase-config.service';

@NgModule({
  declarations: [],
  imports: [
    ConfiguredAngularFireModule
  ],
  providers: [
    ConfigService,
    FirebaseConfigService
  ],
})
export class ConfigModule { }
