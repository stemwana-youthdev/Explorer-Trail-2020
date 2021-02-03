import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public get isLoggedIn(): Observable<boolean> {
    return this.user.pipe(map((state) => !!state));
  }
  public get token(): Observable<string> {
    return this.user.pipe(switchMap((state) => from(state.getIdToken())));
  }
  public get user(): Observable<User> {
    return this.afAuth.authState;
  }

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async signin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['/profile']);
    return credential;
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
