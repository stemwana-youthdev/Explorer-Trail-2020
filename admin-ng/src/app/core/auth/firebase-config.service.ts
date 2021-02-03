import { Injectable } from '@angular/core';
import { FirebaseOptions } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {
  constructor() { }

  get(): FirebaseOptions {
    return {
      apiKey: (window as any).env.AUTH_API,
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
