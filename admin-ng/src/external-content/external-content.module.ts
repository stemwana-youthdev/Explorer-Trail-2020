import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExternalContentItemComponent } from './components/external-content-item/external-content-item.component';
import { ExternalContentComponent } from './components/external-content/external-content.component';
import { ExternalContentRoutingModule } from './external-content-routing.module';
import { SharedModule } from '../app/shared/shared.module';

@NgModule({
  declarations: [
    ExternalContentComponent,
    ExternalContentItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ExternalContentRoutingModule
  ]
})
export class ExternalContentModule {}
