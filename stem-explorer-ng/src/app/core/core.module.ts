import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { DrawerComponent } from './components/drawer/drawer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfigService } from './config/config.service';
import { SharedModule } from '../shared/shared.module';

function getFirebaseConfig() {
  // console.warn(firebaseConfig.get())
  // return firebaseConfig.get();

  return {
    apiKey: 'AIzaSyAdlcKOJpmnJlm1XAJhhhsAU2ElSJjkyYM',
    authDomain: 'explorer-trial.firebaseapp.com',
    databaseURL: 'https://explorer-trial.firebaseio.com',
    projectId: 'explorer-trial',
    storageBucket: 'explorer-trial.appspot.com',
    messagingSenderId: '165828341451',
    appId: '1:165828341451:web:b51d81781c8f524461354e',
    measurementId: 'G-BDMF4PPT9T'
  };
}

@NgModule({
  declarations: [
    DrawerComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
    // AngularFireModule.initializeApp(getFirebaseConfig),
    // AngularFireAuthModule,
    // AngularFirestoreModule
  ],
  exports: [
    DrawerComponent,
    ToolbarComponent
  ],
  providers: [ConfigService, AuthService]
})
export class CoreModule {}
