import { Component, Output, Input, EventEmitter, } from '@angular/core';
import { Validator } from '@angular/forms';
import { Credentials } from '../../models/credentials.interface';
import { Router } from '@angular/router/src/router';

@Component({
    selector: 'vib-password-reset-form',
    styleUrls: ['password-reset-form.component.scss'],
    templateUrl: 'password-reset-form.component.html'
})

export class PasswordResetFormComponent {
    credentials: Credentials;
    password: string;
    passwordConfirmation: string;
    emailValid: Boolean = false;
    emailPresence: Boolean = false;

    @Input() nativeAppLink: boolean;
    @Input() resetResponse: any;
    @Input() resetAction: string;
    @Output() submitPasswordReset: EventEmitter<any> = new EventEmitter<any>();
    @Output() submitNewPassword: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router) {}

    toLogin() {
        if (!this.nativeAppLink) {
            this.router.navigate(['/sign_in']);
        } else {
            this.router.navigateByUrl('vibiio://');
        }
    }

    onBlur(event, email) {
        if (email.errors === null) {
            this.emailValid = true;
        } else if (email.errors.pattern) {
            this.emailValid = false;
        }
    }

    submitPw(isValid: boolean, value: string) {
        if (isValid) {
            this.submitNewPassword.emit(value);
        }
    }

    reset(value: Credentials, isValid: boolean) {
        if (isValid) {
            this.submitPasswordReset.emit(value);
        }
    }
}
