import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { state } from '@angular/animations';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public get user$(): Observable<User> {
    return this.afAuth.authState;
  }

  get isLoggedIn() {
    return !!this.user;
  }
  user: User;
  isAdmin = false;
  loaded = false;
  scheduledTokenRefresh: number;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private api: ApiService
  ) {
    this.user$.subscribe((user) => {
      this.user = user;
      this.fetchToken();
    });
  }

  async fetchToken(forceRefresh = false) {
    clearTimeout(this.scheduledTokenRefresh);
    const res = await this.user.getIdTokenResult(forceRefresh);
    this.scheduleTokenRefresh(res.expirationTime);

    this.api.token = res.token;
    this.isAdmin = await this.api.getIsAdmin().toPromise();
    this.loaded = true;
  }

  scheduleTokenRefresh(expirationTime: string) {
    const exp = new Date(expirationTime);
    const now = new Date();
    const msTillExpiry = exp.getTime() - now.getTime();
    const msIn30Minutes = 30 * 60 * 1000;
    const msTill30MinutesBeforeExpiry = msTillExpiry - msIn30Minutes;
    console.log(msTill30MinutesBeforeExpiry);
    this.scheduledTokenRefresh = setTimeout(() => {
      this.fetchToken();
    }, msTill30MinutesBeforeExpiry);
  }

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
