import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ChallengeDialogComponent } from './components/challenge-dialog/challenge-dialog.component';
import { MapComponent } from './components/map/map.component';
import { MapRoutingModule } from './map-routing.module';
import { GeolocationService } from './services/geolocation.service';
import { MapConfigService } from './services/map-config.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MapRoutingModule,
  ],
  declarations: [MapComponent, ChallengeDialogComponent],
  providers: [GeolocationService, MapConfigService],
  entryComponents: [ChallengeDialogComponent]
})
export class MapModule {}
