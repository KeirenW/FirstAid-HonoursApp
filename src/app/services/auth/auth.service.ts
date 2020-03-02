import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../firebase/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: boolean;

  constructor(private firebaseService: FirebaseService, public afAuth: AngularFireAuth) {
    this.loggedIn = false;
    this.getCurrentUser();
  }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err));
    });
  }

  loginUser(value) {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(session => {
      return new Promise<any>((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
          res => {
            resolve(res);
            this.loggedIn = true;
            localStorage.setItem('UID', firebase.auth().currentUser.uid);
          },
          err => reject(err)
        );
      });
    });
  }

  getCurrentUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (!this.loggedIn) {
        localStorage.removeItem('UID');
      }
    });
  }
}
