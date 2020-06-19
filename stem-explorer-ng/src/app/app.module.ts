import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ConfigModule } from './config/config.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListViewComponent } from './containers/list-view/list-view.component';
import { ApiService } from './shared/services/api.service';
import { MaterialModule } from './shared/material.module';
import { NavTabsComponent } from './shared/components/nav-tabs/nav-tabs.component';
import { ListViewDialogComponent } from './components/list-view-dialog/list-view-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    ListViewComponent,
    NavTabsComponent,
    ListViewDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfigModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [ListViewDialogComponent],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
