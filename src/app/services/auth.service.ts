import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;
  // be sure to change the name of app-token to your-app-name-token
  isLoggedIn() {
    if (this.getToken().length > 0) { return true; }
    return false;
  }

  getToken() {
    const token = localStorage.getItem('app-token') || ''
    return token;
  }

  setToken(token: string) {
    localStorage.setItem('app-token', token );
  }

  logout() {
    localStorage.clear();
  }
}

