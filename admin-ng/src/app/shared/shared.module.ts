import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';
import { MaterialModule } from './material.module';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
// import { DatePickerComponent } from './components/datepicker/datepicker.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
  ],
  declarations: [
    TableComponent,
    HeaderComponent,
    // DatePickerComponent
  ],
  exports: [
    MaterialModule,
    TableComponent,
    HeaderComponent,
    FormlyModule,
    FormlyMaterialModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
  ],
  providers: [
    ConfigService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-NZ' },
  ]
})
export class SharedModule { }
