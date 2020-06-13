import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    public afAuth: AngularFireAuth, //this injects firebase authentication
  ) { }

  // google signin
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then((result) => {
      console.log('You have been succesfully logged in! woohoo')
    }).catch((error) => {
      console.log(error)
    })
  }
}
