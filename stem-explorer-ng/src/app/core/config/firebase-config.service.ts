import { Injectable } from '@angular/core';
import { FirebaseOptions } from '@angular/fire';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {
  constructor(private config: ConfigService) { }

  get(): FirebaseOptions {
    return {
      apiKey: this.config.get('AUTH_API'),
      authDomain: 'explorer-trial.firebaseapp.com',
      databaseURL: 'https://explorer-trial.firebaseio.com',
      projectId: 'explorer-trial',
      storageBucket: 'explorer-trial.appspot.com',
      messagingSenderId: '165828341451',
      appId: '1:165828341451:web:b51d81781c8f524461354e',
      measurementId: 'G-BDMF4PPT9T'
    };
  }
}
