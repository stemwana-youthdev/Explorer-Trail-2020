import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ContentItemComponent } from './content-item/content-item.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent
  },
  {
    path: 'new',
    component: ContentItemComponent
  },
  // {
  //   path: ':id',
  //   component: ContentItemComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ContentRoutingModule {}
