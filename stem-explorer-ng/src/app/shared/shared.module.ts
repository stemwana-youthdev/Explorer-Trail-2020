import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { ButtonComponent } from './components/button/button.component';
import { ChallengeFilterComponent } from './components/challenge-filter.component';
import { ChallengeTitleComponent } from './components/challenge-title/challenge-title.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { FabComponent } from './components/fab/fab.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { InputComponent } from './components/input/input.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material.module';
import { FilterPipe } from './pipes/filter.pipe';
import { LargeDistancePipe } from './pipes/large-distance.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ApiService } from './services/api.service';
import { StemColoursService } from './services/stem-colors.service';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    HttpClientModule,
    MaterialModule,
    GoogleMapsModule,
    RouterModule
  ],
  exports: [
    TruncatePipe,
    MaterialModule,
    GoogleMapsModule,
    FilterPipe,
    LargeDistancePipe,
    SortByPipe,
    FabComponent,
    ButtonComponent,
    ChallengeTitleComponent,
    DialogComponent,
    ContactInfoComponent,
    FormFieldComponent,
    InputComponent,
    ToolbarComponent,
    DrawerComponent,
    ChallengeFilterComponent,
    RouterModule
  ],
  declarations: [
    TruncatePipe,
    FilterPipe,
    LargeDistancePipe,
    SortByPipe,
    FabComponent,
    ButtonComponent,
    ChallengeTitleComponent,
    DialogComponent,
    ContactInfoComponent,
    FormFieldComponent,
    InputComponent,
    ToolbarComponent,
    DrawerComponent,
    ChallengeFilterComponent
  ],
  providers: [
    ApiService,
    StemColoursService,
  ],
})
export class SharedModule { }
