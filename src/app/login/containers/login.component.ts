import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { LoginService } from '../services/login.service';
import { AuthService } from '../../services/auth.service';

// Interfaces
import { Jwt } from '../models/jwt.interface';
import { Credentials } from '../models/credentials.interface';

@Component({
    selector: 'app-login',
    template: `
      <div>
        <app-login-greeting></app-login-greeting>
        <app-login-form
          (submitLogin)="submitLogin($event)"
          ></app-login-form>
      </div>
    `
})

export class LoginComponent {
  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router) {};

  submitLogin(event: Credentials) {
    this.loginService
      .login(event)
      .subscribe(
        (data: Jwt) => {
          this.authService.setToken(data.jwt)
          this.router.navigate(['/vibiios'])
        },
        (error: any) => console.log('error', error))
    }
}
