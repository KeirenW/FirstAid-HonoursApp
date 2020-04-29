import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FirebaseService } from '../services/firebase/firebase.service';

@Component({
  selector: 'app-event',
  templateUrl: 'event.page.html',
  styleUrls: ['event.page.scss']
})
export class EventPage implements OnInit {
  public event;
  public acceptedResponse: boolean;

  constructor(private auth: AuthService, private firestore: FirebaseService) {
    this.event = null;
    this.acceptedResponse = null;
  }

  ngOnInit() {
    this.firestore.getAssignedEventStatus().subscribe(event => {
      this.event = event;
    });
  }

  signOut() {
    this.auth.cleanThenSignOut();
  }
}

interface User {
  firstName?;
  surname?;
  active?;
  email?;
  assignedEvent?;
  uuid?;
  lastLat?;
  lastLng?;
}
