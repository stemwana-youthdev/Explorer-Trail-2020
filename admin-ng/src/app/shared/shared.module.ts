import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';
import { MaterialModule } from './material.module';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule,
  ],
  declarations: [
    TableComponent,
    HeaderComponent
  ],
  exports: [
    MaterialModule,
    TableComponent,
    HeaderComponent,
    FormlyModule,
    FormlyMaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfigService,
  ]
})
export class SharedModule { }
