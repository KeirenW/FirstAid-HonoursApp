import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: 'event.page.html',
  styleUrls: ['event.page.scss']
})
export class EventPage {

  constructor(private auth: AuthService) { }

  signOut() {
    this.auth.cleanThenSignOut();
  }
}
