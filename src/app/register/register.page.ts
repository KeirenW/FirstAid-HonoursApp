import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  account: object;

  constructor() {
    this.account = {
      email: '',
      password: ''
    };
  }

  ngOnInit() {
  }

}
