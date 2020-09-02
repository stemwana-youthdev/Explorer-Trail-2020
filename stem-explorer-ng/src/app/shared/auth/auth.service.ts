import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, defer } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly isLoggedIn: Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth, // this injects firebase authentication
    private api: ApiService,
  ) {
    // defer only gets value from localStorage when the observable is subscribed to
    this.isLoggedIn = defer(() =>
      this.afAuth.authState.pipe(
        map((state) => {
          if (state) {
            return true;
          } else {
            localStorage.removeItem('token');
            return false;
          }
        }),
        startWith(!!localStorage.token),
      )
    );
  }

  private async getToken() {
    let token = localStorage.token;
    let tokenExpirationTime = localStorage.tokenExpirationTime;
    console.log(tokenExpirationTime);
    if (!token || Date.parse(tokenExpirationTime) < Date.now()) {
      const user = await this.afAuth.currentUser;
      const res = await user.getIdTokenResult();
      localStorage.token = token = res.token;
      localStorage.tokenExpirationTime = tokenExpirationTime =
        res.expirationTime;
    }
    return token;
  }

  // google signin
  googleAuthLogin() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  async authLogin(provider: auth.AuthProvider) {
    try {
      const res = await this.afAuth.signInWithPopup(provider);

      let user = await this.getCurrentUser();
      if (!user) {
        const userInfo: User = {
          // id will be ignored
          id: null,
          firstName: '',
          lastName: '',
          region: '',
          homeTown: '',
        };
        user = await this.registerUser(userInfo);
      }

      console.log('You have been succesfully logged in! woohoo', res, user);
    } catch (error) {
      console.warn(error);
    }
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

  async currentUserEmail() {
    const user = await this.afAuth.currentUser;
    if (user != null) {
      return user.email;
    }
  }

  async emailLogin(email: string, password: string) {
    const res = await this.afAuth.signInWithEmailAndPassword(email, password);
    console.log('You have been succesfully logged in!', res);
  }

  async logout() {
    await this.afAuth.signOut();
  }

  // These methods return promises instead of Observables
  // so that we can await this.getToken()
  async getCurrentUser() {
    return await this.api.getCurrentUser(await this.getToken()).toPromise();
  }

  async registerUser(userInfo: User) {
    return await this.api.registerUser(await this.getToken(), userInfo).toPromise();
  }

  async getProfiles() {
    return await this.api.getProfiles(await this.getToken()).toPromise();
  }

  // userInfo needs to have all of its properties set,
  // or they will be set to null in the DB.
  // Usually this will be a copy of CurrentUser.user with
  // the properties you want to update
  async updateCurrentUser(userInfo: User) {
    return await this.api.updateUser(await this.getToken(), userInfo).toPromise();
  }

  async getProgress(profileId: number) {
    return await this.api.getProgress(await this.getToken(), profileId).toPromise();
  }

  async levelCompleted(profileId: number, levelId: number, correct: boolean) {
    return await this.api.levelCompleted(await this.getToken(), profileId, levelId, correct).toPromise();
  }
}
