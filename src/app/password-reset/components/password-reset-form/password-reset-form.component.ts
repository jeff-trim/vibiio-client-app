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
    <div *ngIf="email.errors?.pattern && email.touched">
      Email address is invalid
    </div>
    <div *ngIf="email.errors?.require && email.touched">
      Email address is required
    </div>
    <input type="email"
           name="email"
           [ngModel]="credentials?.email"
           #email = "ngModel"
           placeholder="Enter Email"
           pattern="^[a-zA-Z0–9\\_\\.\\+\\-]+\\@[a-zA-Z0–9\\-]+\\.[a-zA-Z0–9\\-\\.]+$"
           required>
    
    <div class="row center-xs">
      <button type="submit"
              (click)="reset(form.value, form.valid)"
              [disabled]="!email.valid"
              class="button button-primary">Reset Password</button>
    </div>
    <div class="row center-xs">
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
