import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service;
  let store = {};
  let storeTwo = {};
  const token = 'dummy-token';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
          AuthService ]
      });
    }));

  beforeEach(inject([AuthService], s => {
    service = s;
  }));

  beforeEach(() => {
    // mock localStorage
    spyOn(localStorage, 'getItem').and.callFake( (key) => {
        return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake( (key, value) => {
        return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').and.callFake( () => {
       return store = {};
    });

    // mock sessionStorage
    spyOn(sessionStorage, 'clear').and.callFake( () => {
      return storeTwo = {};
    });
    spyOn(sessionStorage, 'getItem').and.callFake( (key) => {
      return storeTwo[key];
    });
  });

  it('should set an auth-token to localStorage if the user is remembered', () => {
    service.setToken(token, true);
    expect(store['app-token']).toContain('dummy-token');
  });

  it('should set an auth-token to sessionStorage if the user is not remembered', () => {
    service.setToken(token, false);
    expect(store['app-token']).toContain('dummy-token');
  });

  it('should get an auth-token from localStorage', () => {
    expect(service.getToken()).toBe('dummy-token');
  });

  it('should get an auth-token from sessionStorage', () => {
    expect(service.getToken()).toBe('dummy-token');
  });

  it('should clear the auth-token from localStorage', () => {
    service.setToken(token, true);
    service.logout();

    expect(store['app-token']).toBeUndefined();
  });

  it('should clear the auth-token from sessionStorage', () => {
    service.setToken(token, false);
    service.logout();

    expect(storeTwo['app-token']).toBeUndefined();
  });
});
