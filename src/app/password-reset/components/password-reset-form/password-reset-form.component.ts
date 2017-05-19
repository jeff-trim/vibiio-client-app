import { Component, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { Validator } from '@angular/forms';
import { Credentials } from '../../models/credentials.interface';

@Component({
  selector: 'app-password-reset-form',
    styleUrls: ['password-reset-form.component.scss'],
    templateUrl: 'password-reset-form.component.html'
})

export class PasswordResetFormComponent {
    credentials: Credentials
    emailValid: Boolean = false
    emailPresence: Boolean = false

    @Input()
    resetResponse: any

    @Output()
    submitPasswordReset: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        this.resetResponse
    }

    onBlur(event, email){
        if (email.errors === null) {
            this.emailValid = true
        } else if (email.errors.pattern) {
            this.emailValid = false
        }
    }

    reset(value: Credentials, isValid: boolean){
        if(isValid){
            this.submitPasswordReset.emit(value);
        }
    }
}
