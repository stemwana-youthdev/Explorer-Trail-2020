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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NavBarComponent } from './components/navbar/navbar.component';
import { SideNavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

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
    RouterModule,
    FormsModule,
  ],
  declarations: [
    TableComponent,
    HeaderComponent,
    NavBarComponent,
    SideNavComponent
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
    RouterModule,
    FormsModule,
    NavBarComponent,
    SideNavComponent
  ],
  providers: [
    ConfigService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-NZ' },
  ]
})
export class SharedModule { }
