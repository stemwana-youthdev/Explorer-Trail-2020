import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ContentComponent } from './modules/content/content.component';
import { ApiService } from './services/api/api.service';
import { UrlService } from './services/api/url.service';
import { ContentDialogComponent } from './modules/content/content-dialog/content-dialog.component';
import { LocationsComponent } from './modules/locations/locations/locations.component';
import { LocationItemComponent } from './modules/locations/location-item/location-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContentComponent,
    ContentDialogComponent,
    LocationsComponent,
    LocationItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [ApiService, UrlService],
  entryComponents: [ContentDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
