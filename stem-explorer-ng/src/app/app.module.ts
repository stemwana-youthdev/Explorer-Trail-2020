import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AdminSharedModule } from 'projects/admin/src/app/app.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterButtonsComponent } from './components/filter-buttons/filter-buttons.component';
import { ListViewDialogComponent } from './components/list-view-dialog/list-view-dialog.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { ConfigModule } from './config/config.module';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { ListViewComponent } from './containers/list-view/list-view.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { MapComponent } from './containers/map/map.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { AuthModule } from './shared/auth/auth.module';
import { NavTabsComponent } from './shared/components/nav-tabs/nav-tabs.component';
import { MaterialModule } from './shared/material.module';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { ApiService } from './shared/services/api.service';
import { ChallengeViewComponent } from './components/challenge-view/challenge-view.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CameraComponent } from './containers/camera/camera.component';
import { CameraButtonComponent } from './containers/camera-button/camera-button.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DrawerComponent } from './containers/drawer/drawer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    MapComponent,
    RegisterPageComponent,
    ListViewComponent,
    NavTabsComponent,
    ListViewDialogComponent,
    TruncatePipe,
    SplashScreenComponent,
    FilterButtonsComponent,
    FilterPipe,
    ChallengeViewComponent,
    ToolbarComponent,
    CameraComponent,
    CameraButtonComponent,
    DrawerComponent
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    // AdminSharedModule.forRoot(),
    AuthModule,
    ConfigModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ZXingScannerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  entryComponents: [
    ListViewDialogComponent,
    SplashScreenComponent
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
