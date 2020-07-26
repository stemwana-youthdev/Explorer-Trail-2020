import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ConfigModule } from './config/config.module';
import { StoreModule } from './store/store.module';
import { SharedModule } from './shared/module';
import { MaterialModule } from './shared/material.module';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { MapComponent } from './containers/map/map.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListViewComponent } from './containers/list-view/list-view.component';
import { ChallengeDialogComponent } from './components/challenge-dialog/challenge-dialog.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FilterButtonsComponent } from './components/filter-buttons/filter-buttons.component';
import { ChallengeViewComponent } from './containers/challenge-view/challenge-view.component';
import { ToolbarComponent } from './containers/toolbar/toolbar.component';
import { CameraComponent } from './containers/camera/camera.component';
import { CameraButtonComponent } from './containers/camera-button/camera-button.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DrawerComponent } from './containers/drawer/drawer.component';
import { HintDialogComponent } from './components/hint-dialog/hint-dialog.component';
import { AnswerDialogComponent } from './containers/answer-dialog/answer-dialog.component';
import { ResultDialogComponent } from './components/result-dialog/result-dialog.component';
import { ChallengeDetailsComponent } from './components/challenge-details/challenge-details.component';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';
import { ChallengeFilterComponent } from './containers/challenge-filter/challenge-filter.component';
import { ChallengeMapComponent } from './components/challenge-map/challenge-map.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    MapComponent,
    RegisterPageComponent,
    ListViewComponent,
    ChallengeDialogComponent,
    SplashScreenComponent,
    FilterButtonsComponent,
    ChallengeViewComponent,
    ToolbarComponent,
    CameraComponent,
    CameraButtonComponent,
    DrawerComponent,
    HintDialogComponent,
    AnswerDialogComponent,
    ResultDialogComponent,
    ChallengeDetailsComponent,
    ChallengeListComponent,
    ChallengeFilterComponent,
    ChallengeMapComponent,
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
  ],
  entryComponents: [
    ChallengeDialogComponent,
    SplashScreenComponent,
    HintDialogComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
