import { NgModule } from '@angular/core';
import { AdminTableComponent } from './table/table.component';
import { AdminNavbarComponent } from './sidenav/navbar.component';
import { AdminMaterialModule } from '../material.module';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    AdminMaterialModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule
  ],
  providers: [],
  exports: [
    AdminTableComponent,
    AdminNavbarComponent,
    AdminMaterialModule,
    FormlyMaterialModule,
    FormlyModule
  ],
  declarations: [
    AdminTableComponent,
    AdminNavbarComponent
  ]
})
export class SharedModule {}
