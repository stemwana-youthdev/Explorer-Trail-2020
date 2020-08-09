import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { NavbarComponent } from './sidenav/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    TableComponent,
    NavbarComponent
  ],
  providers: [],
  exports: [
    MaterialModule,
    TableComponent,
    NavbarComponent,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    FlexLayoutModule
  ],
})
export class SharedModule {}
