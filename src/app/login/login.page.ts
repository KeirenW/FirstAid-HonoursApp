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
  }
  }
}
