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
      this.getToken();
    }
  }

  /**
   * @todo initiate user on first load
   */
  authenticateUser() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.warn(user)
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
      email: user.email
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
    this.setUser(credential.user);
    if (credential.additionalUserInfo.isNewUser) {
      credential.user.sendEmailVerification(this.actionCodeSettings);
      const profile: Profile = {
          id: null,
          email: credential.user.email,
          userId: credential.user.uid,
          profileCompleted: false
        };
      this.createProfile(profile);
    } else {
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
    this.user$ = of(null);
    this.router.navigate(['/']);
  }

  /**
   * register by email, then send email vertification and create new profile
   */
  async registerEmail(email: string, password: string, firstName: string, lastName: string) {
    const obs = await this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.setUser(res.user);
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
  getProfile(): Observable<Profile> {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      return this.api.getProfile(token, this._user.id);
    } else {
      // @todo error handling
      return;
    }
  }

  /**
   * update user profile
   */
  updateProfile(profile: Profile): Observable<Profile> {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      return this.api.updateProfile(token, profile);
    } else {
      // @todo error handling
      return;
    }
  }

  /**
   * set the firebase user in the local storage
   * @param user firebase.user data object
   */
  private setUser(user: firebase.User) {
    this._user = {
      id: user.uid,
      email: user.email
    };
    localStorage.setItem('currentUser', JSON.stringify(this._user));
    this.user$ = of(this._user);
    this.getToken();
  }

  /**
   * gets the user token and sets it in local storage for quick access
   */
  private getToken() {
    return this.afAuth.idToken.pipe(map(res => {
      if (res) {
        localStorage.setItem('token', JSON.stringify(res));
        return res;
      } else {
        // @todo: error handling
        console.warn('Error!');
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
            this.router.navigate(['profile']);
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
