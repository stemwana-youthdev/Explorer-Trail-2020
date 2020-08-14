import { ModuleWithProviders, Provider } from '@angular/core';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire';

import { FirebaseConfigService } from './firebase-config.service';

export function getFirebaseConfig(firebaseConfig: FirebaseConfigService) {
  return firebaseConfig.get();
}

export const firebaseOptions: Provider = {
  provide: FIREBASE_OPTIONS,
  useFactory: getFirebaseConfig,
  deps: [ FirebaseConfigService ]
};

export const ConfiguredAngularFireModule: ModuleWithProviders<AngularFireModule> = {
  ngModule: AngularFireModule,
  providers: [ firebaseOptions ]
};
