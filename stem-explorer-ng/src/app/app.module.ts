import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChallengeDetailsComponent } from './components/challenge-details/challenge-details.component';
import { ResultDialogComponent } from './components/result-dialog/result-dialog.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { ConfigModule } from './config/config.module';
import { AnswerDialogComponent } from './containers/answer-dialog/answer-dialog.component';
import { CameraButtonComponent } from './containers/camera-button/camera-button.component';
import { CameraComponent } from './containers/camera/camera.component';
import { ChallengeViewComponent } from './containers/challenge-view/challenge-view.component';
import { DrawerComponent } from './containers/drawer/drawer.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { ToolbarComponent } from './containers/toolbar/toolbar.component';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from './store/store.module';
import { LocationsModule } from 'src/locations/locations.module';
import { ProfileComponent } from './containers/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SplashScreenComponent,
    ChallengeViewComponent,
    ToolbarComponent,
    CameraComponent,
    CameraButtonComponent,
    DrawerComponent,
    AnswerDialogComponent,
    ResultDialogComponent,
    ChallengeDetailsComponent,
    ProfileComponent,
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    ConfigModule,
    BrowserAnimationsModule,
    ZXingScannerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    StoreModule,
    SharedModule,
    MaterialModule,
    LocationsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    SplashScreenComponent,
  ],
  bootstrap: [AppComponent],
  providers: [{provide: 'googleTagManagerId', useValue: 'GTM-W79HP9V'}]
})
export class AppModule { }
