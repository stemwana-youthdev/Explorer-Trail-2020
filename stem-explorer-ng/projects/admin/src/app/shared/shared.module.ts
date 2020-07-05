import { NgModule } from '@angular/core';
import { AdminTableComponent } from './table/table.component';
import { AdminNavbarComponent } from './sidenav/navbar.component';
import { AdminMaterialModule } from './material.module';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    AdminMaterialModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    MaterialModule
  ],
  providers: [],
  exports: [
    AdminTableComponent,
    AdminNavbarComponent,
    AdminMaterialModule,
    FormlyMaterialModule,
    FormlyModule,
    MaterialModule
  ],
  declarations: [
    AdminTableComponent,
    AdminNavbarComponent
  ]
})
export class SharedModule {}
