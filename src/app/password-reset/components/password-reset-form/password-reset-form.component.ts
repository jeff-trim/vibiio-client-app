import { Component, Output, EventEmitter } from '@angular/core';
import { Validator } from '@angular/forms';
import { Credentials } from '../../models/credentials.interface';
@Component({
  selector: 'app-password-reset-form',
  styleUrls: ['password-reset-form.component.scss'],
  template: `
<div>
  <form #form="ngForm"
        novalidate>
    <input type="email"
           name="email"
           [ngModel]="credentials?.email"
           #email = "ngModel"
           placeholder="Enter Email"
           pattern="^[a-zA-Z0–9\\_\\.\\+\\-]+\\@[a-zA-Z0–9\\-]+\\.[a-zA-Z0–9\\-\\.]+$"
           (blur)="onBlur($event, email)"
           required>
    <div class="row" id="validation-container">
      <div [style.display]="(!emailValid && email.touched) ? 'block' : 'none'">
        🤔 Email address is invalid
      </div>
      <div [style.display]="(!emailPresence && email.touched) ? 'block' : 'none'">
          🤔 Email address is required
      </div>
    </div>
    <div id="button-container" class="row">
      <div class="box">
        <div class="center-xs">
          <button type="submit"
                  class="button button-primary"
                  id="reset"
                  (click)="reset(form.value, form.valid)"
                  [disabled]="!email.valid">Reset Password</button>
        </div>
      </div>
      <br />
      <div class="box">
        <div class="center-xs">
          <button class="button button-primary"
                  id="cancel">Cancel</button>
        </div>
       </div>
    </div>
  </form>
</div>
`
})

export class PasswordResetFormComponent {
    credentials: Credentials
    emailValid: Boolean = false
    emailPresence: Boolean = false

    @Output()
    submitPasswordReset: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    onBlur(event, email){
        if (email.errors === null) {
            this.emailValid = true
        } else if (email.errors.pattern) {
            this.emailValid = false
        }

        if (email.errors === null) {
            this.emailPresence = true
        } else if (email.errors.required) {
            this.emailPresence = false
        }
    }

    reset(value: Credentials, isValid: boolean){
        if(isValid){
            this.submitPasswordReset.emit(value);
        }
    }
}
