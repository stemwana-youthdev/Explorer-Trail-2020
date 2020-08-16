import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngxs/store';

import { auth } from 'firebase/app';
import 'firebase/auth';

import { ApiService } from '../services/api.service';
import { User } from '../models/user';
import { UpdateToken, UpdateUser } from 'src/app/store/current-user/current-user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  specifiedName?: [string, string];

  constructor(
    private afAuth: AngularFireAuth, // this injects firebase authentication
    private api: ApiService,
    private store: Store,
  ) {
    this.afAuth.authState.subscribe(async (state) => {
      const token = await state?.getIdToken();
      this.store.dispatch(new UpdateToken(token));

      if (!token) {
        this.store.dispatch(new UpdateUser(null));
        return;
      }

      let user = await this.api.getCurrentUser().toPromise();

      if (!user) {
        const [firstName, lastName] =
          this.specifiedName ?? this.splitName(state.displayName);
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

      this.store.dispatch(new UpdateUser(user));

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

  async passwordRegister(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    this.specifiedName = [firstName, lastName];
    const res = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password,
    );
    console.log('Registers! Yay!', res);
  }

  async passwordLogin(
    email: string,
    password: string,
  ) {
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('You have been succesfully logged in! woohoo', res);
    } catch (error) {
      console.warn(error);
    }
  }

  async logout() {
    await this.afAuth.signOut();
  }
}
