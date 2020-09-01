import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { ApiService } from 'src/app/shared/services/api.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Profile } from 'src/app/shared/models/profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly isLoggedIn: Observable<boolean>;

  user$: Observable<User>;
  _user: User;
  token: string;

  actionCodeSettings = {
    url: 'https://explorer-trial-ui.herokuapp.com/'
  };

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private api: ApiService,
    private router: Router
  ) {
    if (localStorage.getItem('currentUser') !== null) {
      this._user = JSON.parse(localStorage.getItem('currentUser'));
      this.user$ = of(this._user);
    }
  }

  loadUser() {
    console.warn('loadUser')
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.warn(user)
          user.getIdToken().then((res) => {
            localStorage.setItem('token', JSON.stringify(res));
            return res;
          })
        } else {
          return of(null);
        }
      })
    );
  }

  /**
   * @todo is this needed?
   * @param user 
   */
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      id: user.uid,
      email: user.email
    };

    return userRef.set(data, { merge: true });
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.setUser(credential.user);

    credential.user.sendEmailVerification(this.actionCodeSettings).then(() => {
      console.warn('email sent!')
    });

    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.user$ = of(null);
    this.router.navigate(['/']);
  }

  private setUser(user: firebase.User) {
    this._user = {
      id: user.uid,
      email: user.email
    };
    localStorage.setItem('currentUser', JSON.stringify(this._user));
    this.user$ = of(this._user);
    this.getToken(user);
  }

  private async getToken(user: firebase.User) {
    return user.getIdToken().then(
      (res) => {
        localStorage.setItem('token', JSON.stringify(res));
        return res;
      }
    ).catch();
  }

  // async authLogin(provider: auth.AuthProvider) {
  //   try {
  //     const res = await this.afAuth.signInWithPopup(provider);

  //     let user = await this.getCurrentUser();
  //     if (!user) {
  //       const userInfo: User = {
  //         // id will be ignored
  //         id: null,
  //         firstName: '',
  //         lastName: '',
  //         region: '',
  //         homeTown: '',
  //       };
  //       user = await this.registerUser(userInfo);
  //     }

  //     console.log('You have been succesfully logged in! woohoo', res, user);
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }

  async registerEmail(email: string, password: string, firstName: string, lastName: string) {
    const obs = await this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.setUser(res.user);
        res.user.sendEmailVerification(this.actionCodeSettings);
        this.getToken(res.user).then((token) => {
          console.warn('auth service get token', token)
          const profile: Profile = {
            id: null,
            firstName,
            lastName,
            email: res.user.email,
            homeTown: null,
            region: null,
            photoUrl: null,
            userId: res.user.uid,
            profileCompleted: false
          };
          this.api.registerUser(token, profile);
        }).catch((err) => {
          console.warn('auth service gettoken', err)
        });
        return res;
      }
    ).catch((err) => {
      console.warn('auth service registerEmail', err)
    });
    return obs;
  }

  // async currentUserEmail() {
  //   const user = await this.afAuth.currentUser;
  //   if (user != null) {
  //     return user.email;
  //   }
  // }

  async emailLogin(email: string, password: string) {
    const obs = await this.afAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        this.setUser(res.user);
        return res;
      }
    );
    return obs;
  }

  async forgotPassword(email: string) {
    const res = await this.afAuth.sendPasswordResetEmail(email);
    return res;
  }

  // // These methods return promises instead of Observables
  // // so that we can await this.getToken()
  // async getCurrentUser() {
  //   return await this.api.getCurrentUser(await this.getToken()).toPromise();
  // }

  // async registerUser(userInfo: User) {
  //   return await this.api.registerUser(await this.getToken(), userInfo).toPromise();
  // }

  registerProfile(profileInfo: Profile) {
    const token = localStorage.getItem('token');
    console.warn('registerProfile', token)
    return this.api.registerUser(token, profileInfo);
  }

  getProfile() {
    const token = JSON.parse(localStorage.getItem('token'));
    console.warn('getProfile', token)
    if (token) {
      return this.api.getProfiles(token);
    } else {
      return;
    }
  }

  // async getProfiles() {
  //   return await this.api.getProfiles(await this.getToken()).toPromise();
  // }

  // // userInfo needs to have all of its properties set,
  // // or they will be set to null in the DB.
  // // Usually this will be a copy of CurrentUser.user with
  // // the properties you want to update
  // async updateCurrentUser(userInfo: User) {
  //   return await this.api.updateUser(await this.getToken(), userInfo).toPromise();
  // }

  // async getProgress(profileId: number) {
  //   return await this.api.getProgress(await this.getToken(), profileId).toPromise();
  // }

  // async levelCompleted(profileId: number, levelId: number, correct: boolean) {
  //   return await this.api.levelCompleted(await this.getToken(), profileId, levelId, correct).toPromise();
  // }
}
