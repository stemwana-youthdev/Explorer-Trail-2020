import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { ChallengeItemComponent } from './components/challenge-item/challenge-item.component';
import { ChallengeLocationComponent } from './components/challenge-location/challenge-location.component';
import { ChallengeLevelItemComponent } from './components/challenge-level-item/challenge-level-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChallengesRoutingModule
  ],
  declarations: [
    ChallengesComponent,
    ChallengeItemComponent,
    ChallengeLevelItemComponent,
    ChallengeLocationComponent
  ],
})
export class ChallengesModule { }
