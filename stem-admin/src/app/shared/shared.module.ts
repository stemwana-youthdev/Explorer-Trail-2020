import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { NavbarComponent } from './sidenav/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    TableComponent,
    NavbarComponent
  ],
  providers: [],
  exports: [
    MaterialModule,
    TableComponent,
    NavbarComponent
  ],
})
export class SharedModule {}
