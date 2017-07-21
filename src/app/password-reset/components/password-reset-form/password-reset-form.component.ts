import { Component, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { Validator } from '@angular/forms';
import { Credentials } from '../../models/credentials.interface';

@Component({
    selector: 'app-password-reset-form',
    styleUrls: ['password-reset-form.component.scss'],
    templateUrl: 'password-reset-form.component.html'
})

export class PasswordResetFormComponent {
    credentials: Credentials;
    password: string;
    passwordConfirmation: string;
    emailValid: Boolean = false;
    emailPresence: Boolean = false;
    @Input() resetResponse: any;
    @Input() resetAction: string;
    @Output() submitPasswordReset: EventEmitter<any> = new EventEmitter<any>();
    @Output() submitNewPassword: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        this.resetResponse
    }

    onBlur(event, email) {
        if (email.errors === null) {
            this.emailValid = true
        } else if (email.errors.pattern) {
            this.emailValid = false
        }
    }

    submitPw(isValid: boolean, value: string) {
        if(isValid){
            this.submitNewPassword.emit(value); 
        } else {
            console.log("invalid");
        }
        console.log(value)
    }

    reset(value: Credentials, isValid: boolean) {
        if (isValid) {
            this.submitPasswordReset.emit(value);
        }
    }
}
