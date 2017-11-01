import { TestBed, async, inject } from '@angular/core/testing';
import { LoggedOutGuardService } from './logged-out-guard.service';

import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

describe('LoggedOutGuardService', () => {
  let guard: LoggedOutGuardService;
  let router: Router;
  let token = 'dummy-token';

  const authService = {
      isLoggedIn() { return token; }
  };

  const routerStub = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        LoggedOutGuardService,
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: authService }
      ]
    });

    guard = TestBed.get(LoggedOutGuardService);
    router = TestBed.get(Router);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should activate route and navigate to the dashboard if user is logged in', () => {
    expect(guard.canActivate()).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should return true if user is not logged in', () => {
    token = '';
    expect(guard.canActivate()).toBeTruthy();
  });

});
