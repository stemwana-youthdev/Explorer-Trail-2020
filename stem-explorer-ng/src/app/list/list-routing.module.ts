import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {}
