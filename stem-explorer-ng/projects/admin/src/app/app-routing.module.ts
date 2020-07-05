import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ContentComponent } from './modules/content/content.component';
import { LocationsComponent } from './modules/locations/locations/locations.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'locations',
    component: LocationsComponent
  },
  { path: 'content', component: ContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
