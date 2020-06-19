import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from './auth.service';
import { ConfigModule } from 'src/app/config/config.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    AngularFireAuth,
    AuthService,
    ConfigModule,
  ]
})
export class AuthModule { }
