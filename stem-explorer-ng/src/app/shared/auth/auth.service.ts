import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { auth } from 'firebase/app';
import 'firebase/auth';
import { ApiService } from '../services/api.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public readonly isLoggedIn: Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth, // this injects firebase authentication
    private api: ApiService,
  ) {
    this.isLoggedIn = this.afAuth.authState.pipe(
      map(state => {
        if (state) {
          return true;
        } else {
          return false;
        }
      })
    );

    this.afAuth.authState.subscribe(async (state) => {
      if (!state) { return; }

      const token = await state.getIdToken();
      let user = await this.api.getCurrentUser(token).toPromise();

      if (!user) {
        // TODO: prompt user for registration info
        const userInfo: User = {
          // id will be ignored
          id: null,
          name: state.displayName,
        };

        user = await this.api.registerUser(token, userInfo).toPromise();
      }

      console.log('User logged in with backend!', user);
    });
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
}
