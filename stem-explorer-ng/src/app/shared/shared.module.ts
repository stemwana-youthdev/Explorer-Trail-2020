import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { GeolocationService } from '../../locations/services/geolocation.service';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { ChallengeTitleComponent } from './components/challenge-title/challenge-title.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { InputComponent } from './components/input/input.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { MaterialModule } from './material.module';
import { FilterLocationsPipe } from './pipes/filter-locations.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { LargeDistancePipe } from './pipes/large-distance.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ApiService } from './services/api.service';
import { ImageService } from './services/image.service';
import { StemColorsService } from './services/stem-colors.service';
import { ImageService } from './services/image.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileReminderService } from './services/profile-reminder.service';
import { FilterLocationsPipe } from './pipes/filter-locations.pipe';
import { VisibleDirective } from './directives/visible.directive';
import { MessageService } from './services/message.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

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
    FilterLocationsPipe,
    VisibleDirective,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  providers: [
    ApiService,
    StemColorsService,
    GeolocationService,
    ImageService,
    ProfileReminderService,
    MessageService,
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
    ProfilePictureComponent,
    FlexLayoutModule,
    ReactiveFormsModule,
    FilterLocationsPipe,
    VisibleDirective,
    ConfirmDialogComponent,
  ],
})
export class SharedModule { }
