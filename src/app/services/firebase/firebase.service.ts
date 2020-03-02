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
      email: value.email
    });
  }

  getUserDetails(value) {
    return this.db.collection('users').doc<IUser>(value).snapshotChanges();
  }
}

interface IUser {
  firstName: string;
  surname: string;
  email: string;
}
