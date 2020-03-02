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
  }

  loginSubmitted() {
    this.auth.loginUser(this.credentials).then(value => {
        if (value) {
          // Logged in
          this.router.navigateByUrl('/app/tabs/profile');
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}

interface ICredentials {
  email: string;
  password: string;
}
