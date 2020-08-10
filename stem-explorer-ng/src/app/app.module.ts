import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnswerDialogComponent } from './challenges/components/answer-dialog/answer-dialog.component';
import { ChallengeDetailsComponent } from './challenges/components/challenge-details/challenge-details.component';
import { ChallengeViewComponent } from './challenges/components/challenge-view/challenge-view.component';
import { HintDialogComponent } from './challenges/components/hint-dialog/hint-dialog.component';
import { ResultDialogComponent } from './challenges/components/result-dialog/result-dialog.component';
import { ConfigModule } from './core/config/config.module';
import { ChallengeListComponent } from './list/components/challenge-list/challenge-list.component';
import { ListViewComponent } from './list/components/list-view/list-view.component';
import { ChallengeDialogComponent } from './map/components/challenge-dialog/challenge-dialog.component';
import { CameraComponent } from './shared/camera/camera.component';
import { ChallengeFilterComponent } from './shared/challenge-filter/challenge-filter.component';
import { FilterButtonsComponent } from './shared/filter-buttons/filter-buttons.component';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { SplashScreenComponent } from './shared/splash-screen/splash-screen.component';
import { StoreModule } from './store/store.module';
import { LoginPageComponent } from './users/components/login-page/login-page.component';
import { RegisterPageComponent } from './users/components/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ListViewComponent,
    ChallengeDialogComponent,
    SplashScreenComponent,
    FilterButtonsComponent,
    ChallengeViewComponent,
    CameraComponent,
    HintDialogComponent,
    AnswerDialogComponent,
    ResultDialogComponent,
    ChallengeDetailsComponent,
    ChallengeListComponent,
    ChallengeFilterComponent,
  ],
  imports: [
    // GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    ConfigModule,
    BrowserAnimationsModule,
    ZXingScannerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
    }),
    FormsModule,
    StoreModule,
    SharedModule,
    MaterialModule,
  ],
  entryComponents: [
    ChallengeDialogComponent,
    SplashScreenComponent,
    HintDialogComponent
  ],
  bootstrap: [AppComponent],
  providers: [{provide: 'googleTagManagerId', useValue: 'GTM-W79HP9V'}]
})
export class AppModule { }
