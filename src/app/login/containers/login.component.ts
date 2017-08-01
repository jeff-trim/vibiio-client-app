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
          [unauthorized]="unauthorized"
          ></app-login-form>
      </div>
    `
})

export class LoginComponent {
  unauthorized: boolean = false

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router) {}

  submitLogin(event: Credentials) {
    this.loginService
      .login(event)
      .subscribe(
        (data: Jwt) => {
          if (data.role === 'vibiiographer') {
            this.authService.setToken(data.jwt);
              this.router.navigate(['/dashboard/my-vibiios']);
              this.unauthorized = false;
          } else {
              this.unauthorized = true;
            // TODO: provide feedback on form for this event
            console.log('not authorized');
          }
        },
          // TODO: provide feedback on form for this event
          (error: any) =>{
              if(error.status === 404) {
                  this.unauthorized = true;
              }
          }
      );
  }
}
