import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FirebaseService } from '../services/firebase/firebase.service';

@Component({
  selector: 'app-event',
  templateUrl: 'event.page.html',
  styleUrls: ['event.page.scss']
})
export class EventPage implements OnInit {
  public user: User;
  public event: any;
  public acceptedResponse: boolean;

  constructor(private auth: AuthService, private firestore: FirebaseService) {
    this.user = {assignedEvent: '', firstName: ''};
    this.acceptedResponse = null;
    this.event = null;
  }

  ngOnInit() {
    this.firestore.getAssignedEventStatus(this.auth.getCurrentUser()).subscribe(user => {
      this.user = user;
      console.log('User assigned event: ', this.user.assignedEvent);
      if (this.user.assignedEvent !== '') {
        this.firestore.getAssignedEvent(this.user.assignedEvent).subscribe(event => {
          this.event = event;
          console.log('Assigned event: ', this.event);
        });
      }
    });
  }

  respondToRequest(answer) {
    if (answer) {
      // Accepted
      console.log('Accepted!');
      this.acceptedResponse = answer;
    } else {
      // Rejected
      console.log('Rejected!');
      // Fire back to admin to get new asignee
    }
  }

  signOut() {
    this.auth.cleanThenSignOut();
  }
}

interface User {
  firstName?: string;
  surname?: string;
  active?: boolean;
  email?: string;
  assignedEvent?: string;
  uuid?: string;
  lastLat?: string;
  lastLng?: string;
}
