import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ApiService } from './services/api/api.service';
import { UrlService } from './services/api/url.service';
import { LocationsComponent } from './modules/locations/locations/locations.component';
import { LocationItemComponent } from './modules/locations/location-item/location-item.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { RouterState } from './shared/state/router.state';
import { ContentDialogComponent } from './modules/content/content-dialog/content-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LocationsComponent,
    LocationItemComponent,
    ContentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxsModule.forRoot([RouterState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [ApiService, UrlService],
  bootstrap: [AppComponent],
  entryComponents: [ContentDialogComponent]
})
export class AppModule { }
