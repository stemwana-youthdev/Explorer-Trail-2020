import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationItemComponent } from './components/location-item/location-item.component';
import { LocationsComponent } from './components/locations/locations.component';

const routes: Routes = [
  { path: '', component: LocationsComponent },
  {
    path: 'create',
    component: LocationItemComponent
  },
  {
    path: ':id',
    component: LocationItemComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule {}
