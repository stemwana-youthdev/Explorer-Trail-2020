import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationsRoutingModule } from './locations-routing.module';
import { NgxsModule } from '@ngxs/store';
import { LocationsState } from './store/locations.state';
import { MapComponent } from './components/map/map.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ChallengeDialogComponent } from './components/challenge-dialog/challenge-dialog.component';
import { ChallengeFilterComponent } from './components/challenge-filter/challenge-filter.component';
import { ChallengeMapComponent } from './components/challenge-map/challenge-map.component';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';
import { FilterButtonsComponent } from './components/filter-buttons/filter-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LocationsRoutingModule,
    NgxsModule.forFeature([LocationsState])
  ],
  declarations: [
    MapComponent,
    ChallengeMapComponent,
    ListViewComponent,
    ChallengeListComponent,
    ChallengeDialogComponent,
    ChallengeFilterComponent,
    FilterButtonsComponent
  ]
})
export class LocationsModule {}
