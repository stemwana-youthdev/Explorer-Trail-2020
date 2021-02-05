import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { NotAdminDialogComponent } from '../components/not-admin-dialog/not-admin-dialog.component';

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
  scheduledTokenRefresh: number;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private api: ApiService,
    private dialog: MatDialog
  ) {
    this.user$.subscribe((user) => {
      this.user = user;
      this.fetchToken();
    });
  }

  async fetchToken(forceRefresh = false) {
    clearTimeout(this.scheduledTokenRefresh);
    if (!this.user) {
      return false;
    }

    const res = await this.user.getIdTokenResult(forceRefresh);
    this.api.token = res.token;
    this.scheduleTokenRefresh(res.expirationTime);

    if (!this.user.emailVerified) {
      console.warn(
        'Email should always be verified for Sign In with Google,',
        'but in this instance it was not.'
      );
    }

    const isAdmin = await this.api.getIsAdmin().toPromise();
    if (!isAdmin) {
      this.dialog.open(NotAdminDialogComponent, {
        data: { email: this.user.email },
      });
      this.signOut();
    }
  }

  scheduleTokenRefresh(expirationTime: string) {
    const exp = new Date(expirationTime);
    const now = new Date();

    const msTillExpiry = exp.getTime() - now.getTime();
    const msIn30Minutes = 30 * 60 * 1000;
    const msTill30MinutesBeforeExpiry = msTillExpiry - msIn30Minutes;

    this.scheduledTokenRefresh = setTimeout(() => {
      this.fetchToken(true);
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
