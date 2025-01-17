import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
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

  @Input()
  unauthorized: boolean;

  ngOnInit() {
    this.credentials = {
      email: '',
      password: '',
      remember: false
    };
  }

  constructor() {}

    toggleRememberMe() {
        this.credentials.remember = !this.credentials.remember;
    }

  login(value: Credentials, isValid: boolean) {
    value = Object.assign({}, value, { remember: this.credentials.remember });

    if (isValid) {
      this.submitLogin.emit(value);
    }
  }
}
