import { Component, Output, EventEmitter } from '@angular/core';
import { Credentials } from '../../models/credentials.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.scss']
})

export class LoginFormComponent {
  credentials: Credentials;

  @Output()
  submitLogin: EventEmitter<Credentials> = new EventEmitter<Credentials>();

  constructor() {};

  login(value: Credentials, isValid: boolean) {
    if (isValid) {
      this.submitLogin.emit(value);
    }
  }

}
