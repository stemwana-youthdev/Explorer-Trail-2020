import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';
import { ApiService } from './services/api.service';
import { MaterialModule } from './material.module';
import { NavTabsComponent } from './components/nav-tabs/nav-tabs.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { FabComponent } from './components/fab/fab.component';
import { FabContainerComponent } from './components/fab-container/fab-container.component';
import { ButtonComponent } from './components/button/button.component';
import { ChallengeTitleComponent } from './components/challenge-title/challenge-title.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { InputComponent } from './components/input/input.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { StemColorsService } from './services/stem-colors.service';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    NavTabsComponent,
    TruncatePipe,
    FilterPipe,
    FabComponent,
    FabContainerComponent,
    ButtonComponent,
    CardComponent,
    ChallengeTitleComponent,
    DialogComponent,
    ContactInfoComponent,
    FormFieldComponent,
    InputComponent,
  ],
  imports: [
    AuthModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    ApiService,
    StemColorsService,
  ],
})
export class SharedModule { }
