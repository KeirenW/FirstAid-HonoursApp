import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: ICredentials;

  constructor(private router:Router) {
    this.credentials = {
      username: '',
      password: ''
    };
  }

  ngOnInit() {
  }

  async NavigateToHome() {
    this.router.navigateByUrl("/app/tabs/tab1")
  }

  loginSubmitted() {
    console.log('Form submitted!');
    /**
     * HTTP request to DB with SALTED AND HASHED CREDENTIALS by credentials service (npm install --save simple-crypto-js)
     * Recieve session ID
     */
    console.log('Username: ', this.credentials.username);
    console.log('Password: ', this.credentials.password);
  }

  loginWithSessionID() {
    /**
     * Check session ID against stored value.
     * 
     * Possibly store list of open sessions per user,
     * allows user to revoke access to specific devices.
     * 
     * Need to also send a Device ID when loging in with credentials.
     */
  }
}

interface ICredentials {
  username: String,
  password: String;
}
