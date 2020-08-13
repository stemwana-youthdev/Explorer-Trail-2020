import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { ChallengeLevelsState } from './challenge-levels/challenge-levels.state';
import { ChallengesState } from './challenges/challenges.state';
import { LastHomepageState } from './last-homepage/last-homepage.state';
// import { LocationDistancesState } from './location-distances/location-distances.state';
import { LocationsState } from './locations/locations.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot(
      [
        ChallengesState,
        LocationsState,
        ChallengeLevelsState,
        // LocationDistancesState,
        LastHomepageState,
      ],
      { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  exports: [
    NgxsModule,
    NgxsReduxDevtoolsPluginModule,
    NgxsLoggerPluginModule,
  ],
})
export class StoreModule { }
