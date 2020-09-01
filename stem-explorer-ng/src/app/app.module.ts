import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ChallengeModule } from 'src/challenge/challenge.module';
import { LocationsModule } from 'src/locations/locations.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from './store/store.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';

const firebaseConfig = {
  apiKey: 'AIzaSyAdlcKOJpmnJlm1XAJhhhsAU2ElSJjkyYM',
  authDomain: 'explorer-trial.firebaseapp.com',
  databaseURL: 'https://explorer-trial.firebaseio.com',
  projectId: 'explorer-trial',
  storageBucket: 'explorer-trial.appspot.com',
  messagingSenderId: '165828341451',
  appId: '1:165828341451:web:b51d81781c8f524461354e',
  measurementId: 'G-BDMF4PPT9T'
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SplashScreenComponent,
    ProfileComponent,
    ForgotPasswordComponent
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    StoreModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    LocationsModule,
    ChallengeModule,
  ],
  entryComponents: [
    SplashScreenComponent,
  ],
  bootstrap: [AppComponent],
  providers: [{provide: 'googleTagManagerId', useValue: 'GTM-W79HP9V'}]
})
export class AppModule { }
