import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../firebase/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUUID: string;

  constructor(private db: AngularFirestore, public afAuth: AngularFireAuth, private router: Router, private notifs: NotificationService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUUID = user.uid;
        console.log('USER UID SET', this.currentUUID);
        // Subscribe to their notif channel
        this.notifs.subscribeToTopic(this.getCurrentUser());
        this.router.navigateByUrl('/app/tabs/profile');
      } else {
        this.currentUUID = null;
        console.log('USER UID NULL', this.currentUUID);
      }
    });
  }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            this.currentUUID = res.user.uid;
            resolve(res);
          },
          err => reject(err));
    });
  }

  loginUser(value) {
    return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password).then(() => {
      });
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

  cleanThenSignOut() {
    this.db.collection('users').doc(this.currentUUID).update(
      {
        active: false,
        lastLat: '',
        lastLng: ''
      }
    ).then(() => {
      this.currentUUID = null;
      this.afAuth.auth.signOut();
      this.router.navigateByUrl('');
    }).catch(err => { });
  }
}
