import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { auth } from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public readonly isLoggedIn: Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth, //this injects firebase authentication
  ) {
    this.isLoggedIn = this.afAuth.authState.pipe(
      map(state => {
        if (state)
          return true;
        else
          return false;
      })
    );
  }

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

  async logout() {
    await this.afAuth.signOut();
  }

  async emailRegister(
    email: string,
    password: string
  ) {
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('Successful register!', res);
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }
}
