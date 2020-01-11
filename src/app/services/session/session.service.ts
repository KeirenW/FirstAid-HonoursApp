import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  user: IUser;

  constructor() {
    this.user = {
      username: '',
      name: '',
      sessionID: ''
    };
  }

  getUsername() {
    return this.user.username;
  }

  setUsername(username: String) {
    this.user.username = username;
  }

  getName() {
    return this.user.name;
  }

  setName(name: String) {
    this.user.name = name;
  }

  getSessionID() {
    return this.user.sessionID;
  }

  setSessionID(sessionID: String) {
    this.user.sessionID = sessionID;
  }
}

interface IUser {
  username: String,
  name: String,
  sessionID: String;
}
