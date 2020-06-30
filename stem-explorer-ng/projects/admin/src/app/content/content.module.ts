import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContentItemComponent } from './content-item/content-item.component';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content/content.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContentRoutingModule
  ],
  providers: [],
  declarations: [ContentComponent, ContentItemComponent]
})
export class ContentModule {}
