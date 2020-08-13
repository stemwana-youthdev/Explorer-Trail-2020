import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'map',
    component: MapComponent,
    data: {
      title: 'Explorer Trial'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
