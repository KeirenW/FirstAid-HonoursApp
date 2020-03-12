import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore) { }

  initialUserSetup(value) {
    return this.db.collection('users').doc(value.UUID).set({
      firstName: value.fName,
      surname: value.surname,
      email: value.email,
      uuid: value.UUID,
      lastLat: '56.458405',
      lastLng: '-2.982447'
      // TODO: Lat/Long need to be dynamic
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
