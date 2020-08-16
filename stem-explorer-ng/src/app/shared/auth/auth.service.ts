import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // public readonly isLoggedIn: boolean;

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth, // this injects firebase authentication
    private afs: AngularFirestore,
    private router: Router
  ) {
    // this.afAuth.authState.pipe(
    //   map(state => {
    //     this.isLoggedIn = state ? true : false;
    //   })
    // );
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // google signin
  // googleAuthLogin() {
  //   return this.authLogin(new auth.GoogleAuthProvider());
  // }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email
    }

    return userRef.set(data, { merge: true });
  }

  // async authLogin(provider: auth.AuthProvider) {
  //   try {
  //     const res = await this.afAuth.signInWithPopup(provider);
  //     console.log('You have been succesfully logged in! woohoo', res);
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }

  // async logout() {
  //   await this.afAuth.signOut();
  // }
}
