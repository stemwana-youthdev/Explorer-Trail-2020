import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { ApiService } from 'src/app/shared/services/api.service';
import { Profile } from 'src/app/shared/models/profile';
import { ProfileReminderService } from 'src/app/shared/services/profile-reminder.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly isLoggedIn: Observable<any>;

  user$: Observable<User>;
  _user: User;
  token: string;
  token$: Observable<string>;
  profile: Profile;
  guestCompleted: number[] = [];

  actionCodeSettings = {
    url: 'https://explorer-trial-ui.herokuapp.com/'
  };

  constructor(
    private afAuth: AngularFireAuth,
    private api: ApiService,
    private router: Router,
    private profileReminder: ProfileReminderService,
    private dialog: MatDialog
  ) {
    if (localStorage.getItem('currentUser') !== null) {
      this._user = JSON.parse(localStorage.getItem('currentUser'));
      this.user$ = of(this._user);
      this.getToken().subscribe();
      this.getProfile().subscribe((profile) => this.profileReminder.checkCompleted(profile))
    }
  }

  /**
   * @todo initiate user on first load
   */
  authenticateUser() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) {
          user.getIdTokenResult().then((res) => {
            localStorage.setItem('token', JSON.stringify(res.token));
            return res;
          });
        }
      })
    );
  }

  /**
   * Record guest progress locally so that they can save it when they login
   * Only call if the answer was successful
   */
  recordGuestCompleted(levelId: number) {
    this.guestCompleted.push(levelId);
  }

  /**
   * Gets called whenever a profile is created to save the user's progress to their new profile
   */
  async saveGuestCompleted() {
    if (this.guestCompleted.length > 0) {
      const token = await this.getToken().pipe(take(1)).toPromise();
      const profile = await this.getProfile(token).toPromise();

      // Run all of the requests at the same time
      await Promise.all(
        this.guestCompleted.map(
          async (levelId) => {
            await this.api
              .levelCompleted(token, profile.id, levelId, true)
              .toPromise();
          }
        )
      );
      this.guestCompleted = [];
    }
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
      this.profileReminder.remindUser();
      this.saveGuestCompleted();
    }
  }

  /**
   * sign out
   */
  async signOut(redirect = '/') {
    await this.afAuth.signOut();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.user$ = of(null);
    this.router.navigateByUrl(redirect);
  }

  /**
   * delete the user's account
   */
  async deleteAccount() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete your account?' },
      panelClass: 'app-dialog',
    });
    const result = await dialog.afterClosed().toPromise();
    if (!result) {
      return;
    }

    try {
      const token = await this.getToken().pipe(take(1)).toPromise();
      await this.api.deleteProfile(token).toPromise();
      await this.deleteFirebaseAccount();
    } catch (error) {
      console.error(error);
      const errorDialog = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: `We couldn't delete your details from our system. Would you still like to delete your account?`,
        },
        panelClass: 'app-dialog',
      });
      const errorResult = await errorDialog.afterClosed().toPromise();
      if (errorResult) {
        await this.deleteFirebaseAccount();
      }
    }
  }

  /**
   * delete the user's Firebase account
   * does not delete their details from our backend
   */
  async deleteFirebaseAccount() {
    try {
      const user = await this.afAuth.currentUser;
      await user.delete();
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
      this.user$ = of(null);
      this.router.navigateByUrl('/');
    } catch (error) {
      console.error(error);
      const errorDialog = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message:
            'There was an error while deleting your Firebase account. Would you like to sign in again and try again?',
        },
        panelClass: 'app-dialog',
      });
      const result = await errorDialog.afterClosed().toPromise();
      if (result) {
        await this.signOut('/login');
      }
    }
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
    this.saveGuestCompleted();
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
      console.warn('Profile error!');
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
      console.warn('update photo error');
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
          this.getProfile().subscribe();
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
            this.profileReminder.remindUser();
            this.saveGuestCompleted();
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
