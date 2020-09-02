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
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { ConfigModule } from './config/config.module';
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
import { ProfilePhotoDialogComponent } from './containers/profile-photo-dialog/profile-photo-dialog.component';
import { ChallengeModule } from 'src/challenge/challenge.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SplashScreenComponent,
    ToolbarComponent,
    DrawerComponent,
    ProfileComponent,
    ProfilePhotoDialogComponent,
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    ConfigModule,
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
