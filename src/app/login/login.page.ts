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

  constructor(private router: Router, private auth: AuthService) {
    this.credentials = {
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/app/tabs/profile');
    }
  }

  loginSubmitted() {
    this.auth.loginUser(this.credentials).catch(error => {
        console.log(error.message);
      });
  }
}

interface ICredentials {
  email: string;
  password: string;
}
