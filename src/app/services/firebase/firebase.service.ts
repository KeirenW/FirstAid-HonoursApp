import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore, private auth: AuthService) { }

  initialUserSetup(value) {
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

  updateUserActiveStatus(uuid, isActive: boolean) {
    this.db.collection('users').doc(uuid).update({active: isActive});
  }

  updateUserLocation(uuid, location) {
    this.db.collection('users').doc(uuid).update(
      {
        lastLat: location.lat,
        lastLng: location.lng
      }
    );
  }

  getAssignedEventStatus() {
    return this.db.collection('users').doc(this.auth.getCurrentUser()).valueChanges();
  }
}

interface IUser {
  firstName: string;
  surname: string;
  email: string;
}
