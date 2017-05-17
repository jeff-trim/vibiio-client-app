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
           required>
    <div *ngIf="email.errors?.pattern && email.touched">
      	🤔 Email address is invalid
    </div>

    <div *ngIf="email.errors?.required && email.touched">
      	🤔 Email address is required
    </div>
    <div class="center-xs">
      <button type="submit"
              class="button button-primary"
              id="reset"
              (click)="reset(form.value, form.valid)"
              [disabled]="!email.valid">Reset Password</button>
    </div>
    <div class="center-xs">
      <button class="button button-primary"
              id="cancel">Cancel</button>
    </div>
  </form>
</div>
`
})

export class PasswordResetFormComponent {
    credentials: Credentials;

    @Output()
    submitPasswordReset: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    reset(value: Credentials, isValid: boolean){
        if(isValid){
            this.submitPasswordReset.emit(value);
        }
    }
}
