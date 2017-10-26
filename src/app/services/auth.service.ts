import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;
  // be sure to change the name of app-token to your-app-name-token
  constructor() {}
  isLoggedIn() {
    if (this.getToken().length > 0) { return true; }
    return false;
  }

  getToken() {
    const token = this.getData('app-token') || '';
    return token;
  }

  getData(key: string) {
    let data = localStorage.getItem(key);

    if (!data) {
      data = sessionStorage.getItem(key);
    }
    return data;
  }

  setToken(token: string, remember: boolean) {
    if (remember) {
      localStorage.setItem('app-token', token);
    } else {
      sessionStorage.setItem('app-token', token);
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }
}

