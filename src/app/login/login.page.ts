import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: ICredentials;

  constructor(private router:Router, private auth: AuthService) {
    this.credentials = {
      email: '',
      password: ''
    };
  }

  ngOnInit() {
  }

  loginSubmitted() {
    console.log('Form submitted!');
    console.log('Email: ', this.credentials.email);
    console.log('Password: ', this.credentials.password);
    try {
      this.auth.loginUser(this.credentials).then(value => {
        if (value) {
          // Logged in
          this.router.navigateByUrl('/app/tabs/tabs1');
        } else {
          // Error logging in
          // TODO add helpful error messages for reason why login failed
        }
      });
    } catch (error) {
      console.log('Error');
    }
  }
}

interface ICredentials {
  email: string;
  password: string;
}
