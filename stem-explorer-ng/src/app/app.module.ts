import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ConfigModule } from './config/config.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsViewComponent } from './shared/components/tabs-view/tabs-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    TabsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfigModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
