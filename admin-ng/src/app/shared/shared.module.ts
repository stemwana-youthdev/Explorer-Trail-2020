import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';
import { MaterialModule } from './material.module';
import { TableComponent } from './components/table/table.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  declarations: [
    TableComponent
  ],
  exports: [
    MaterialModule,
    TableComponent
  ],
  providers: [
    ConfigService,
  ]
})
export class SharedModule { }
