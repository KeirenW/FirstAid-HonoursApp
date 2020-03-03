import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FirebaseService } from '../services/firebase/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  public user: IUser = {
    firstName: '',
    surname: '',
    email: ''
  };

  constructor(public auth: AuthService, public firebase: FirebaseService) {}

  ngOnInit() {
    this.firebase.getUserDetails(localStorage.getItem('UID')).subscribe(res => this.user = res.payload.data());
  }

  updateDetails() {
    /**
     * Changing email listed in DB may cause issues with Authentication
     * Fix this by updating email associated with the account in firebase
     */
    this.firebase.updateUserDetails(localStorage.getItem('UID'), this.user).then(message => alert('Details Updated'));
  }
}

interface IUser {
  firstName: string;
  surname: string;
  email: string;
}
