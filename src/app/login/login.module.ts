import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Containers
import { LoginComponent } from './containers/login.component';

// Components
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginGreetingComponent } from './components/login-greeting/login-greeting.component';

// Services
import { LoginService } from './services/login.service';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    LoginGreetingComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginService,
    AuthService
  ]
})

export class LoginModule {};
