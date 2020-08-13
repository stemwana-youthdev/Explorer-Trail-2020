import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './components/list.component';

@NgModule({
  imports: [CommonModule, SharedModule, ListRoutingModule],
  declarations: [ListComponent]
})
export class ListModule {}
