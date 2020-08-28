import { Routes, RouterModule } from '@angular/router';
import { ChallengeViewComponent } from './components/challenge-view/challenge-view.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: ChallengeViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule {}
