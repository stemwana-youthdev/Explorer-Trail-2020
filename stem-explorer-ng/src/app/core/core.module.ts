import { CommonModule } from '@angular/common';
import { NgModule, Provider, ModuleWithProviders } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { DrawerComponent } from './components/drawer/drawer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfigService } from './config/config.service';
import { SharedModule } from '../shared/shared.module';
import { FirebaseConfigService } from './auth/firebase-config.service';
import { FIREBASE_OPTIONS, AngularFireModule } from '@angular/fire';

function getFirebaseConfig(firebaseConfig: FirebaseConfigService) {
  return firebaseConfig.get();
}

const firebaseOptions: Provider = {
  provide: FIREBASE_OPTIONS,
  useFactory: getFirebaseConfig,
  deps: [ FirebaseConfigService ]
};

const ConfiguredAngularFireModule: ModuleWithProviders<AngularFireModule> = {
  ngModule: AngularFireModule,
  providers: [ firebaseOptions ]
};

@NgModule({
  declarations: [
    DrawerComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConfiguredAngularFireModule
  ],
  exports: [
    DrawerComponent,
    ToolbarComponent
  ],
  providers: [ConfigService, AuthService]
})
export class CoreModule {}
