import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

import { auth } from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private afAuth: AngularFireAuth, //this injects firebase authentication
  ) { }

  // google signin
  googleAuthLogin() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  async authLogin(provider: auth.AuthProvider) {
    try {
      const res = await this.afAuth.signInWithPopup(provider);
      console.log('You have been succesfully logged in! woohoo', res);
    } catch (error) {
      console.warn(error);
    }
  }
}
