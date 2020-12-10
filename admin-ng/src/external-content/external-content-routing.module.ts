import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalContentItemComponent } from './components/external-content-item/external-content-item.component';
import { ExternalContentComponent } from './components/external-content/external-content.component';

const routes: Routes = [
  { path: '', component: ExternalContentComponent },
  {
    path: 'create',
    component: ExternalContentItemComponent,
  },
  {
    path: ':id',
    component: ExternalContentItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalContentRoutingModule {}
