import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminsComponent } from './components/admins/admins.component';
import { AdminsRoutingModule } from './admins-routing.module';
import { SharedModule } from '../app/shared/shared.module';

@NgModule({
  declarations: [AdminsComponent],
  imports: [CommonModule, SharedModule, AdminsRoutingModule],
})
export class AdminsModule {}
