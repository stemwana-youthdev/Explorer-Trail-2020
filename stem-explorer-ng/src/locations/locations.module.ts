import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './components/list/list.component';
import { MapComponent } from './components/map/map.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { GeolocationService } from './services/geolocation.service';
import { MapConfigService } from './services/map-config.service';
import { LocationsState } from './store/locations.state';
import { FilterComponent } from './components/filter/filter.component';
import { ChallengeDialogComponent } from './components/challenge-dialog/challenge-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LocationsRoutingModule,
    NgxsModule.forFeature([LocationsState]),
  ],
  declarations: [MapComponent, ListComponent, FilterComponent, ChallengeDialogComponent],
  providers: [GeolocationService, MapConfigService],
})
export class LocationsModule {}
