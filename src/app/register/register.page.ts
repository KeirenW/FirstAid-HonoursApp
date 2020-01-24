import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  account: IAccount;
  passwordsMatch: boolean;

  constructor(private auth: AuthService) {
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
      // Register user
      this.auth.registerUser(this.account);
    }
  }

}

interface IAccount {
  fName: string;
  surname: string;
  email: string;
  password: string;
  confirm: string;
}
