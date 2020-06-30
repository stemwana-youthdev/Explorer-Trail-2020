import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { LocationsComponent } from './locations/components/locations/locations.component';
import { ContentComponent } from './content/content/content.component';
import { ContentItemComponent } from './content/content-item/content-item.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'locations',
    component: LocationsComponent
  },
  {
    path: 'content',
    component: ContentComponent
  },
  {
    path: 'content/:id',
    component: ContentItemComponent
  },
  {
    path: 'content/new',
    component: ContentItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
