import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocationItemComponent } from './components/location-item/location-item.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { SharedModule } from '../app/shared/shared.module';

@NgModule({
  declarations: [
    LocationsComponent,
    LocationItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LocationsRoutingModule
  ]
})
export class LocationsModule {}
