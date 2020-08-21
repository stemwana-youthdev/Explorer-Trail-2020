import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '../models/user';
import { ApiService } from '../services/api.service';

@Injectable()
export class AuthApiService {
  private async getAuthOptions() {
    const user = await this.afAuth.currentUser;
    const token = await user.getIdToken();
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private afAuth: AngularFireAuth,
  ) { }

  // These methods return promises instead of Observables
  // so that we can await this.getAuthOptions()
  async getCurrentUser() {
    return await this.http.get<User>(
      `${this.api.apiEndpoint}/User/CurrentUser`,
      await this.getAuthOptions()
    ).toPromise();
  }

  async registerUser(userInfo: User) {
    return await this.http.post<User>(
      `${this.api.apiEndpoint}/User/RegisterUser`,
      userInfo,
      await this.getAuthOptions()
    ).toPromise();
  }

  // userInfo needs to have all of its properties set,
  // or they will be set to null in the DB.
  // Usually this will be a copy of CurrentUser.user with
  // the properties you want to update
  async updateCurrentUser(userInfo: User) {
    return await this.http.put<User>(
      `${this.api.apiEndpoint}/User/CurrentUser`,
      userInfo,
      await this.getAuthOptions()
    ).toPromise();
  }
}

