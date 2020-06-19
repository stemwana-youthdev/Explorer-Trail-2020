import { Injectable, ModuleWithProviders, Provider } from '@angular/core';
import { AngularFireModule, FirebaseOptions, FIREBASE_OPTIONS } from '@angular/fire';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {
  constructor(private config: ConfigService) { }

  get(): FirebaseOptions {
    return {
      apiKey: this.config.get('AUTH_API'),
      authDomain: "explorer-trial.firebaseapp.com",
      databaseURL: "https://explorer-trial.firebaseio.com",
      projectId: "explorer-trial",
      storageBucket: "explorer-trial.appspot.com",
      messagingSenderId: "165828341451",
      appId: "1:165828341451:web:b51d81781c8f524461354e",
      measurementId: "G-BDMF4PPT9T"
    };
  }
}

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
