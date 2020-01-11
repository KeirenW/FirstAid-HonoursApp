import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  user: IUser;

  constructor(private http: HttpClient) {
    this.user = {
      username: '',
      name: '',
      sessionID: ''
    };
  }

  getUsername() {
    return this.user.username;
  }

  setUsername(username: string) {
    this.user.username = username;
  }

  getName() {
    return this.user.name;
  }

  setName(name: string) {
    this.user.name = name;
  }

  getSessionID() {
    return this.user.sessionID;
  }

  setSessionID(sessionID: string) {
    this.user.sessionID = sessionID;
  }
}

interface IUser {
  username: string,
  name: string,
  sessionID: string;
}
