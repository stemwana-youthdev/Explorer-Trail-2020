import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { ContentModule } from './content/content.module';
import { LocationsComponent } from './locations/components/locations/locations.component';
import { AdminMaterialModule } from './material.module';
import { ApiService } from './services/api/api.service';
import { UrlService } from './services/api/url.service';
import { SharedModule } from './shared/shared.module';

const providers = [ApiService, UrlService];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LocationsComponent
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
    ContentModule,
    SharedModule
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AdminAppModule { }

@NgModule({})
export class AdminAppSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminAppModule,
      providers
    };
  }
}
