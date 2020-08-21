import { Routes, RouterModule } from '@angular/router';
import { ListViewComponent } from './components/list-view/list-view.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: ListViewComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule {}