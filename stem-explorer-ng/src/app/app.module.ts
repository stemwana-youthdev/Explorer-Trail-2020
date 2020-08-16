import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigModule } from './core/config/config.module';
import { CameraComponent } from './shared/camera/camera.component';
import { SharedModule } from './shared/shared.module';
import { SplashScreenComponent } from './shared/splash-screen/splash-screen.component';
import { StoreModule } from './store/store.module';
import { LoginPageComponent } from './users/login-page/login-page.component';
import { RegisterPageComponent } from './users/register-page/register-page.component';
import { ChallengeTallyComponent } from './users/challenge-tally/challenge-tally.component';
import { ChallengesModule } from 'src/challenges/challenges.module';
import { LocationsModule } from 'src/locations/locations.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SplashScreenComponent,
    CameraComponent,
    ChallengeTallyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfigModule,
    BrowserAnimationsModule,
    ZXingScannerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
    }),
    FormsModule,
    StoreModule,
    SharedModule,
    LocationsModule,
    ChallengesModule
  ],
  entryComponents: [
    SplashScreenComponent
  ],
  bootstrap: [AppComponent],
  providers: [{provide: 'googleTagManagerId', useValue: 'GTM-W79HP9V'}]
})
export class AppModule { }
