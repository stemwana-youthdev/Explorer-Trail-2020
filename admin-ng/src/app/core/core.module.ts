import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './auth/auth.service';
import { FirebaseConfigService } from './auth/firebase-config.service';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire';
import { ProfileComponent } from './components/profile/profile.component';

function getFirebaseConfig(firebaseConfig: FirebaseConfigService) {
  return firebaseConfig.get();
}

const firebaseOptions: Provider = {
  provide: FIREBASE_OPTIONS,
  useFactory: getFirebaseConfig,
  deps: [ FirebaseConfigService ]
};

const ConfiguredAngularFireModule: ModuleWithProviders<AngularFireModule> = {
  ngModule: AngularFireModule,
  providers: [ firebaseOptions ]
};

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ConfiguredAngularFireModule
  ],
  providers: [
    AuthService,
    FirebaseConfigService
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class CoreModule {}
