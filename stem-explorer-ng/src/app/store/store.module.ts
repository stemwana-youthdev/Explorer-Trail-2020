import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { ChallengeLevelsState } from './challenge-levels/challenge-levels.state';
import { ChallengesState } from './challenges/challenges.state';
import { LastHomepageState } from './last-homepage/last-homepage.state';
import { ProgressState } from './progress/progress.state';
import { ProfilesState } from './profiles/profiles.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot(
      [
        ChallengesState,
        ChallengeLevelsState,
        LastHomepageState,
        ProgressState,
        ProfilesState,
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
