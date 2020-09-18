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
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { ProfilePhotoDialogComponent } from './containers/profile-photo-dialog/profile-photo-dialog.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from './store/store.module';
import { CoreModule } from './core/core.module';
import { FeaturedLocationsComponent } from './containers/featured-locations/featured-locations.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SplashScreenComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ProfilePhotoDialogComponent,
    FeaturedLocationsComponent,
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
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
