import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ConfigModule } from './config/config.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { MapComponent } from './containers/map/map.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListViewComponent } from './containers/list-view/list-view.component';
import { ListViewDialogComponent } from './components/list-view-dialog/list-view-dialog.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FilterButtonsComponent } from './components/filter-buttons/filter-buttons.component';
import { ChallengeViewComponent } from './components/challenge-view/challenge-view.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CameraComponent } from './containers/camera/camera.component';
import { CameraButtonComponent } from './containers/camera-button/camera-button.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DrawerComponent } from './containers/drawer/drawer.component';
import { HintDialogComponent } from './components/hint-dialog/hint-dialog.component';
import { AnswerDialogComponent } from './containers/answer-dialog/answer-dialog.component';
import { ResultDialogComponent } from './components/result-dialog/result-dialog.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    MapComponent,
    RegisterPageComponent,
    ListViewComponent,
    ListViewDialogComponent,
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
    SharedModule,
  ],
  entryComponents: [
    ListViewDialogComponent,
    SplashScreenComponent,
    HintDialogComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
