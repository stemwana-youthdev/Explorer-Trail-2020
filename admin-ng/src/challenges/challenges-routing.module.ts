import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChallengeItemComponent } from './components/challenge-item/challenge-item.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengesRoutingModule { }
