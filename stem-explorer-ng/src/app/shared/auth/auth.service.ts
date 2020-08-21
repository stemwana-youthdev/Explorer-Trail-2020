import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReplaySubject, Observable } from 'rxjs';

import { auth } from 'firebase/app';
import 'firebase/auth';

import { ApiService } from '../services/api.service';
import { User } from '../models/user';
import { map, take } from 'rxjs/operators';

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
        if (state)
          return true;
        else
          return false;
      })
    );

    this.afAuth.authState.subscribe(async (state) => {
      const token = await state?.getIdToken();
      this.api.token = token;

      if (!token) {
        return;
      }

      let user = await this.api.getCurrentUser().toPromise();

      if (!user) {
        // TODO: prompt user for registration info

        const [firstName, lastName] = this.splitName(state.displayName);

        const userInfo: User = {
          // id will be ignored
          id: null,
          firstName,
          lastName,
          region: '',
          homeTown: '',
        };

        user = await this.api.registerUser(userInfo).toPromise();
      }

      console.log('User logged in with backend!', user);
    });
  }

  // Split first and last name
  splitName(displayName: string): [string, string] {
    if (typeof displayName !== 'string') {
      return ['', ''];
    }
    const parts = displayName.split(' ');
    if (parts.length <= 1) {
      // Just one word is normally a first name
      return [displayName, ''];
    } else {
      // Otherwise one last name and the rest are first names
      return [
        parts.slice(0, parts.length - 1).join(' '),
        parts[parts.length - 1],
      ];
    }
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
