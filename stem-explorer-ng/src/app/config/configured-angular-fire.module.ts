import { ModuleWithProviders, Provider } from '@angular/core';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire';

import { FirebaseConfigService } from './firebase-config.service';
import { ConfigService } from './config.service';

export function getFirebaseConfig(firebaseConfig: FirebaseConfigService) {
  return firebaseConfig.get();
}

export const firebaseOptions: Provider = {
  provide: FIREBASE_OPTIONS,
  useFactory: getFirebaseConfig,
  deps: [
    FirebaseConfigService,
    ConfigService
  ]
};

export const ConfiguredAngularFireModule: ModuleWithProviders = {
  ngModule: AngularFireModule,
  providers: [ firebaseOptions ]
};
