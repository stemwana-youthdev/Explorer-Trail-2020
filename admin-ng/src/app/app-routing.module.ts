import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, pathMatch: 'full'
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
