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

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private api: ApiService
  ) {
    this.user$.subscribe(async (user) => {
      this.user = user;
      const res = await user.getIdTokenResult();
      this.scheduleTokenRefresh(res.expirationTime);
      this.api.token = res.token;
      this.isAdmin = await api.getIsAdmin().toPromise();
      this.loaded = true;
    });
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
