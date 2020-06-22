import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminNavbarComponent } from './shared/sidenav/navbar.component';
import { AdminMaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

const providers = [];

@NgModule({
  declarations: [
    AppComponent,
    AdminNavbarComponent,
    DashboardComponent
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
