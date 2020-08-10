import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';
import { ApiService } from './services/api.service';
import { MaterialModule } from './material.module';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { LargeDistancePipe } from './pipes/large-distance.pipe';
import { FabComponent } from './components/fab/fab.component';
import { ButtonComponent } from './components/button/button.component';
import { ChallengeTitleComponent } from './components/challenge-title/challenge-title.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { InputComponent } from './components/input/input.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { StemColorsService } from './services/stem-colors.service';
import { CardComponent } from './components/card/card.component';
import { GeolocationService } from '../map/services/geolocation.service';
import { SortByPipe } from './pipes/sort-by.pipe';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { GoogleMapsModule } from '@angular/google-maps';

const pipes: any[] = [
  TruncatePipe,
  FilterPipe,
  LargeDistancePipe,
  SortByPipe
];

@NgModule({
  declarations: [
    pipes,
    FabComponent,
    ButtonComponent,
    CardComponent,
    ChallengeTitleComponent,
    DialogComponent,
    ContactInfoComponent,
    FormFieldComponent,
    InputComponent,
    ToolbarComponent,
    DrawerComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    HttpClientModule,
    MaterialModule,
    GoogleMapsModule,
  ],
  providers: [
    ApiService,
    StemColorsService,
    GeolocationService,
  ],
  exports: [
    pipes,
    FabComponent,
    ButtonComponent,
    CardComponent,
    ChallengeTitleComponent,
    DialogComponent,
    ContactInfoComponent,
    FormFieldComponent,
    InputComponent,
    ToolbarComponent,
    DrawerComponent
  ],
})
export class SharedModule { }
