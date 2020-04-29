import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: 'event.page.html',
  styleUrls: ['event.page.scss']
})
export class EventPage {
  public event;
  constructor(private auth: AuthService) {
    this.event = null;
  }

  signOut() {
    this.auth.cleanThenSignOut();
  }
}
