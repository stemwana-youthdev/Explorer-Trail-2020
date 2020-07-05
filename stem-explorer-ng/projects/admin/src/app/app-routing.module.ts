import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ContentComponent } from './modules/content/content.component';
import { LocationsComponent } from './modules/locations/locations/locations.component';

const routes: Routes = [
  {
    path: 'admin',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  { path: 'admin/dashboard', component: DashboardComponent },
  {
    path: 'admin/locations',
    component: LocationsComponent
  },
  { path: 'admin/content', component: ContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
