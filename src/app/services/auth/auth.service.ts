import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../firebase/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUUID: string;

  constructor(private firebaseService: FirebaseService, public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUUID = user.uid;
        console.log('USER UID SET', this.currentUUID);
        this.router.navigateByUrl('/app/tabs/profile');
      } else {
        this.currentUUID = null;
        console.log('USER UID NULL', this.currentUUID);
      }
    });


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
    return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
    });
  }

  isLoggedIn(): boolean {
    if (this.currentUUID == null) {
      console.log('NOT LOGGED IN');
      return false;
    } else {
      console.log('LOGGED IN');
      return true;
    }
  }

  getCurrentUser() {
    return this.currentUUID;
  }

  signOut() {
    this.firebaseService.updateUserActiveStatus(this.currentUUID, false);
    this.afAuth.auth.signOut().then(() => {
      this.currentUUID = null;
      this.router.navigateByUrl('');
    });
  }
}
