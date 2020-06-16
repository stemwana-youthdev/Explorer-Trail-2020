import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { ConfigModule } from './config/config.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { MapComponent } from './containers/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    MapComponent
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    ConfigModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
