import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AdminMaterialModule } from './shared/material.module';
import { ApiService } from './services/api/api.service';
import { UrlService } from './services/api/url.service';
import { SharedModule } from './shared/shared.module';
import { ContentComponent } from './modules/content/content.component';
import { ContentDialogComponent } from './modules/content/content-dialog/content-dialog.component';
import { LocationsComponent } from './modules/locations/locations/locations.component';

const providers = [ApiService, UrlService];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LocationsComponent,
    ContentComponent,
    ContentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    HttpClientModule,
    SharedModule
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AdminAppModule { }

@NgModule({})
export class AdminSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminAppModule,
      providers
    };
  }
}
