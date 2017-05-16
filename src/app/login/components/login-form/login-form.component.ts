import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Credentials } from '../../models/credentials.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  credentials: Credentials;

  @Output()
  submitLogin: EventEmitter<Credentials> = new EventEmitter<Credentials>();

  ngOnInit() {
    this.credentials = {
      email: 'vibiiographer@example.com',
      password: '',
      remember: false
    };
  }

  constructor() {};

  login(value: Credentials, isValid: boolean) {
    if (isValid) {
      this.submitLogin.emit(value);
    }
  }
}
