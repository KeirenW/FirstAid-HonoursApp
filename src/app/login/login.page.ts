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

  async NavigateToHome() {
    this.router.navigateByUrl("/app/tabs/tab1")
  }

  async loginSubmitted() {
    console.log('Form submitted!');
    console.log('Email: ', this.credentials.email);
    console.log('Password: ', this.credentials.password);
    if (await this.auth.checkLoggedIn()) {
      console.log('Logged in');
    }
  }
}

interface ICredentials {
  email: string;
  password: string;
}
