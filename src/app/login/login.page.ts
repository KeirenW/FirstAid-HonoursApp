import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = {};

  constructor(private router:Router) { }

  ngOnInit() {
  }

  async NavigateToHome() {
    this.router.navigateByUrl("/app/tabs/tab1")
  }

  loginWithCredentails() {
    console.log('Form submitted!');
    /**
     * HTTP request to DB with SALTED AND HASHED CREDENTIALS
     * Recieve session ID
     */
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
