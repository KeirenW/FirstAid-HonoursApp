import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase/app';

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

  getAssignedEventStatus(value) {
    return this.db.collection('users').doc(value).valueChanges();
  }

  getAssignedEvent(value) {
    return this.db.collection('events').doc(value).valueChanges();
  }

  acceptEventAssignment(EventUID, UUID) {
    this.db.collection('events').doc(EventUID).update({Responder: UUID});
    this.db.collection('users').doc(UUID).update({active: false});
  }

  rejectEventAssignment(EventUID, UUID) {
    this.db.collection('events').doc(EventUID).update({Responder: null});
    this.db.collection('users').doc(UUID).update({
      assignedEvent: {
        uuid: null,
        timestamp: null
      }
    });
  }
}

interface IUser {
  firstName: string;
  surname: string;
  email: string;
}

interface Event {
  assignees?: [
    {
      response?: boolean;
      timeNotified?: any,
      timeResponded?: any,
      uuid?: string,
    }
  ];
  UUID?: string;
}
