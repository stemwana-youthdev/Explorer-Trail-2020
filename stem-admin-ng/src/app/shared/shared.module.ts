import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ],
  declarations: [TableComponent],
  providers: [],
  exports: [
    MaterialModule,
    TableComponent
  ]
})
export class SharedModule {}
