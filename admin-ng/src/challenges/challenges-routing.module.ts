import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChallengeItemComponent } from './components/challenge-item/challenge-item.component';
import { ChallengeLevelItemComponent } from './components/challenge-level-item/challenge-level-item.component';
import { ChallengesComponent } from './components/challenges/challenges.component';

const routes = [
  { path: '', component: ChallengesComponent },
  {
    path: 'create',
    component: ChallengeItemComponent
  },
  {
    path: ':id',
    component: ChallengeItemComponent
  },
  {
    path: ':id/levels/create',
    component: ChallengeLevelItemComponent
  },
  {
    path: ':id/levels/:level',
    component: ChallengeLevelItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengesRoutingModule { }
