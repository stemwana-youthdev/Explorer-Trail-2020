import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../app/shared/shared.module';
import { LocationsRoutingModule } from './locations-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LocationsRoutingModule
  ],
  declarations: []
})
export class LocationsModule {}
