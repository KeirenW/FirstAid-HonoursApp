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

  setAssignedEventAnswer(answer, event) {
    if (answer) {
      // accepted
    } else {
      // Rejected, unassign and notificy admin
      this.db.collection('assigned').doc(event).valueChanges().subscribe(res => {
        let lastAssigned: any = res;
        const timestamp = new Date().toUTCString();
        lastAssigned.assignees[lastAssigned.assignees.length - 1] = {
          response: false,
          timeNotified: lastAssigned.assignees[lastAssigned.assignees.length - 1].timeNotified,
          timeResponded: timestamp,
          uuid: lastAssigned.assignees[lastAssigned.assignees.length - 1].uuid,
        };
        this.db.collection('assigned').doc(event).update(lastAssigned);
      });

      this.db.collection('users').doc(this.auth.getCurrentUser()).update({assignedEvent: ''});
    }
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
