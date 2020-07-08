import { ApiService } from './shared/services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { ConfigModule } from './config/config.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { MapComponent } from './containers/map/map.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { AuthModule } from './shared/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListViewComponent } from './containers/list-view/list-view.component';
import { MaterialModule } from './shared/material.module';
import { NavTabsComponent } from './shared/components/nav-tabs/nav-tabs.component';
import { ListViewDialogComponent } from './components/list-view-dialog/list-view-dialog.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FilterButtonsComponent } from './components/filter-buttons/filter-buttons.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CameraComponent } from './containers/camera/camera.component';
import { CameraButtonComponent } from './containers/camera-button/camera-button.component';

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
    ToolbarComponent,
    CameraComponent,
    CameraButtonComponent
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ConfigModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ZXingScannerModule,
  ],
  entryComponents: [
    ListViewDialogComponent,
    SplashScreenComponent
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
