import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationsRoutingModule } from './locations-routing.module';
import { NgxsModule } from '@ngxs/store';
import { LocationsState } from './store/locations.state';
import { Map2Component } from './components/map/map2.component';
import { ChallengeDialogComponent } from './components/challenge-dialog/challenge-dialog.component';
import { ChallengeFilterComponent } from './components/challenge-filter/challenge-filter.component';
import { ListComponent } from './components/list/list.component';
import { ChallengeProgressComponent } from './components/challenge-progress/challenge-progress.component';
import { BottomNavComponent } from './components/bottom-navigation/bottom-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LocationsRoutingModule,
    NgxsModule.forFeature([LocationsState])
  ],
  declarations: [
    Map2Component,
    ListComponent,
    ChallengeDialogComponent,
    ChallengeFilterComponent,
    ChallengeProgressComponent,
    BottomNavComponent
  ]
})
export class LocationsModule {}
