import { Component } from '@angular/core';

@Component({
  selector: 'app-login-greeting',
  styleUrls: ['login-greeting.component.scss'],
  template: `
    <div class="center col-xs-12 contain">
      <div class="logo"></div>
      <div class="welcome">
        <h1>Welcome to vibiio!</h1>
      </div>
      <div class="message">
        <p>👋 Sign in below to view your vibiios.</p>
      </div>
    </div>
`
})

export class LoginGreetingComponent {}
