import 'firebase/app';
import 'firebase/auth';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthService } from './auth.service';
import { AuthApiService } from './auth-api.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    AuthApiService,
  ]
})
export class AuthModule { }
