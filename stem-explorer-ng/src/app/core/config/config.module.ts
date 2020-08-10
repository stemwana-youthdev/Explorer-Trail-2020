import { NgModule } from '@angular/core';

import { ConfigService } from './config.service';
import { ConfiguredAngularFireModule } from './configured-angular-fire.module';

@NgModule({
  declarations: [],
  imports: [
    ConfiguredAngularFireModule
  ],
  providers: [
    ConfigService
  ],
})
export class ConfigModule { }
