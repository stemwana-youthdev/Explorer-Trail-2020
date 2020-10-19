import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '', component: AppComponent
  },
  {
    path: 'locations',
    loadChildren: () => import('../locations/locations.module').then(m => m.LocationsModule)
  },
  {
    path: 'challenges',
    loadChildren: () => import('../challenges/challenges.module').then(m => m.ChallengesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
