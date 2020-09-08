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
  public readonly isLoggedIn: Observable<any>;

  user$: Observable<User>;
  _user: User;
  token: string;
  token$: Observable<string>;
  profile: Profile;

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
      this.getToken().subscribe();
    }
  }

  /**
   * @todo initiate user on first load
   */
  authenticateUser() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          user.getIdTokenResult().then((res) => {
            localStorage.setItem('token', JSON.stringify(res.token));
            return res;
          });
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
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
      email: user.email,
      photo: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  /**
   * Sign in and register with google method. If new user, send the email vertification
   * and create a profile.
   */
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    if (credential.additionalUserInfo.isNewUser) {
      this.setUser(credential.user, true);
      const profile: Profile = {
        id: null,
        email: credential.user.email,
        userId: credential.user.uid,
        profileCompleted: false
      };
      this.createProfile(profile);
    } else {
      this.setUser(credential.user);
      this.router.navigate(['/']);
    }

    return this.updateUserData(credential.user);
  }

  /**
   * sign out
   */
  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.user$ = of(null);
    this.router.navigate(['/']);
  }

  /**
   * register by email, then send email vertification and create new profile
   */
  async registerEmail(email: string, password: string, firstName: string, lastName: string) {
    const obs = await this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.setUser(res.user, true);
        res.user.sendEmailVerification(this.actionCodeSettings);
        const profile: Profile = {
          id: null,
          firstName,
          lastName,
          email: res.user.email,
          userId: res.user.uid,
          profileCompleted: false
        };

        this.createProfile(profile);
        return res;
      }
    ).catch((err) => {
      // @todo: error handling
      console.warn('auth service registerEmail', err);
    });
    return this.updateUserData(obs);
  }

  /**
   * email log in for existing users
   */
  async emailLogin(email: string, password: string) {
    const obs = await this.afAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        this.setUser(res.user);
        return res;
      }
    );
    return obs;
  }

  /**
   * email reset password link.
   */
  async forgotPassword(email: string) {
    const res = await this.afAuth.sendPasswordResetEmail(email);
    return res;
  }

  /**
   * Get the user profile
   */
  getProfile(token?: string): Observable<Profile> {
    const userToken = token || JSON.parse(localStorage.getItem('token'));
    if (userToken) {
      const obs = this.api.getProfile(userToken, this._user.id).pipe(map(res => {
        localStorage.setItem('profile', JSON.stringify(res));
        this.profile = res;
        return res;
      }));
      return obs;
    } else {
      // @todo error handling
      console.warn('Profile error!')
      return;
    }
  }

  /**
   * update user profile
   */
  updateProfile(profile: Profile, photo?: any): Observable<Profile> {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      if (photo !== null) {
        this.updatePhotoURL(photo);
      }
      return this.api.updateProfile(token, profile);
    } else {
      // @todo error handling
      return;
    }
  }

  async updatePhotoURL(photoURL) {
    const user = await this.afAuth.currentUser;
    await user.updateProfile({ photoURL }).then(
      (res) => {
        this.setUser(user);
      }
    ).catch(() => {
      console.warn('update photo error')
    });
  }

  /**
   * set the firebase user in the local storage
   * @param user firebase.user data object
   */
  private setUser(user: firebase.User, newUser = false) {
    this._user = {
      id: user.uid,
      email: user.email,
      photo: user.photoURL
    };
    localStorage.setItem('currentUser', JSON.stringify(this._user));
    this.user$ = of(this._user);
    this.getToken().subscribe(
      () => {
        if (!newUser) {
          this.getProfile();
        }
      }
    );
  }

  /**
   * gets the user token and sets it in local storage for quick access
   */
  private getToken() {
    return this.afAuth.idToken.pipe(map(res => {
      if (res) {
        localStorage.setItem('token', JSON.stringify(res));
        // this.getProfile().subscribe();
        return res;
      } else {
        // @todo: error handling
        console.warn('Error!');
        this.authenticateUser();
      }
    }));
  }

  /**
   * creates a profile for the user in our db.
   */
  private createProfile(profile: Profile) {
    this.getToken().pipe(map(token => {
      if (token) {
        this.api.createProfile(profile, token).pipe(map((success) => {
          if (success) {
            localStorage.setItem('profile', JSON.stringify(success));
            this.router.navigate(['/']);
          }
        })).subscribe();
      }
    })).subscribe();
  }

  // async getProgress(profileId: number) {
  //   return await this.api.getProgress(await this.getToken(), profileId).toPromise();
  // }

  // async levelCompleted(profileId: number, levelId: number, correct: boolean) {
  //   return await this.api.levelCompleted(await this.getToken(), profileId, levelId, correct).toPromise();
  // }
}
