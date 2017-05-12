import { Component } from '@angular/core';

@Component({
  selector: 'app-password-reset-instructions',
  styleUrls: ['./password-reset-instructions.component.scss'],
  template: `
    <div>
      <div class="logo"></div>
      <div class="welcome">
        <h1>Forgot Your Password?</h1>
      </div>
      <div class="message">
        <p>💁 No problem! Just enter your password below and we’ll send you a link to reset it.</p>
      </div>
    </div>
`
})

export class PasswordResetInstructionsComponent {}
