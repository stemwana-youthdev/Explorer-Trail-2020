import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { ContentState } from './content-state/content.state';
import { ContentComponent } from './content.component';

const routes: Routes = [
  { path: 'content', component: ContentComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([ContentState])
  ],
  declarations: [ContentComponent],
})
export class ContentModule {}
