import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FirebaseService } from '../services/firebase/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  account: IAccount;
  passwordsMatch: boolean;

  constructor(private auth: AuthService, private firebase: FirebaseService, private router: Router) {
    this.account = {
      fName: '',
      surname: '',
      email: '',
      password: '',
      confirm: ''
    };
    this.passwordsMatch = true;

  }

  ngOnInit() {
  }

  registerAccount() {
    // Check passwords match
    if (this.account.password !== this.account.confirm) {
      this.passwordsMatch = false;
    } else {
      // Register user then punt to login page
      this.auth.registerUser(this.account).then(value => {
        console.log(value);
        this.firebase.initialUserSetup({
          UUID: value.user.uid,
          fName: this.account.fName,
          surname: this.account.surname,
          email: value.user.email
        }).then(go => this.router.navigateByUrl('app/tabs/tab1'));
      });
    }
    // TODO errors can occur here still when creating accounts such as:
      // Firebase may not like the formatting of the email or password etc.
  }

}

interface IAccount {
  fName: string;
  surname: string;
  email: string;
  password: string;
  confirm: string;
}
