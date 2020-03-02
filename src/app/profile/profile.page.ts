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
  public test: any;

  constructor(public auth: AuthService, public firebase: FirebaseService) {}

  ngOnInit() {
    this.firebase.getUserDetails(localStorage.getItem('UID')).subscribe(res => this.user = res.payload.data());
  }
}

interface IUser {
  firstName: string;
  surname: string;
  email: string;
}
