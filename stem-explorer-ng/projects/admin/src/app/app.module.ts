import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminNavbarComponent } from './shared/sidenav/navbar.component';
import { AdminMaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { AdminTableComponent } from './shared/table/table.component';
import { LocationsComponent } from './locations/components/locations/locations.component';

const providers = [];

@NgModule({
  declarations: [
    AppComponent,
    AdminNavbarComponent,
    DashboardComponent,
    AdminTableComponent,
    LocationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminMaterialModule,
    BrowserAnimationsModule
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
