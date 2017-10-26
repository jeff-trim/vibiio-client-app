import { Injectable } from '@angular/core';
import { LocalStoreManagerService } from './local-store-manager.service';

@Injectable()
export class AuthService {
  token: string;
  // be sure to change the name of app-token to your-app-name-token
  constructor(private storageManager: LocalStoreManagerService) {}
  isLoggedIn() {
    if (this.getToken().length > 0) { return true; }
    return false;
  }

  getToken() {
    const token = this.storageManager.getData('app-token') || '';
    return token;
  }

  setToken(token: string, remember: boolean) {
    if (remember) {
      this.storageManager.savePermanentData(token, 'app-token');
    } else {
      this.storageManager.saveSyncedSessionData(token, 'app-token');
    }
  }

  logout() {
    this.storageManager.deleteData('app-token');
  }
}

