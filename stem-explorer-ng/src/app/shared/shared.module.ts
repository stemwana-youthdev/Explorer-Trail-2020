import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { MaterialModule } from './material.module';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { LargeDistancePipe } from './pipes/large-distance.pipe';
import { ButtonComponent } from './components/button/button.component';
import { ChallengeTitleComponent } from './components/challenge-title/challenge-title.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { InputComponent } from './components/input/input.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { StemColorsService } from './services/stem-colors.service';
import { CardComponent } from './components/card/card.component';
import { GeolocationService } from '../../locations/services/geolocation.service';
import { SortByPipe } from './pipes/sort-by.pipe';
import { GoogleMapsModule } from '@angular/google-maps';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { ImageService } from './services/image.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ProfileReminderService } from './services/profile-reminder.service';

@NgModule({
  declarations: [
    TruncatePipe,
    FilterPipe,
    LargeDistancePipe,
    ButtonComponent,
    CardComponent,
    ChallengeTitleComponent,
    DialogComponent,
    ContactInfoComponent,
    FormFieldComponent,
    InputComponent,
    SortByPipe,
    ProfilePictureComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    GoogleMapsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ZXingScannerModule,

  ],
  providers: [
    ApiService,
    StemColorsService,
    GeolocationService,
    ImageService,
    ProfileReminderService,
  ],
  exports: [
    TruncatePipe,
    FilterPipe,
    LargeDistancePipe,
    ButtonComponent,
    CardComponent,
    ChallengeTitleComponent,
    DialogComponent,
    ContactInfoComponent,
    FormFieldComponent,
    InputComponent,
    SortByPipe,
    MaterialModule,
    GoogleMapsModule,
    ProfilePictureComponent,
    FlexLayoutModule,
    ReactiveFormsModule,
    ZXingScannerModule,
  ],
})
export class SharedModule { }
