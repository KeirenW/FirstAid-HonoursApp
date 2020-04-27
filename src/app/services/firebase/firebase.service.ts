import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore) { }

  initialUserSetup(value) {
    localStorage.setItem('UID', value.uuid);
    return this.db.collection('users').doc(value.UUID).set({
      active: false,
      email: value.email,
      firstName: value.fName,
      surname: value.surname,
      lastLat: '',
      lastLng: '',
      uuid: value.uuid
    });
  }

  getUserDetails(value) {
    return this.db.collection('users').doc<IUser>(value).snapshotChanges();
  }

  updateUserDetails(value, details) {
    return this.db.collection('users').doc<IUser>(value).update(details);
  }
}

interface IUser {
  firstName: string;
  surname: string;
  email: string;
}
