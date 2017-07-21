import { Component } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router'

// Services
import { PasswordResetService } from '../services/password-reset.service';

//interfaces
import { Credentials } from '../models/credentials.interface';

@Component({
    styleUrls: ['./password-reset.component.scss'],
    providers: [PasswordResetService],
    templateUrl: 'password-reset.component.html'
})

export class PasswordResetComponent {
    passwordResetResponse: any
    header: string
    copy: string
    jwt: string = "request-reset"
    resetAction: string

    constructor(private passwordResetService: PasswordResetService,
                private activatedRoute: ActivatedRoute){

        this.passwordResetResponse
    }

    ngOnInit(){
        this.activatedRoute.queryParams.subscribe((params) => {
            this.jwt = params['token']
            if(this.jwt){
                this.resetAction = "new-pw"
                this.setText(this.resetHeader, this.resetCopy)
            } else {
                this.resetAction = "reset-submission"
                this.setText(this.welcomeHeader, this.welcomeCopy)
            }
        })
    }

    submitPasswordReset(event: Credentials){
       this.passwordResetService
            .resetPassword(event)
            .subscribe(
                (response: Response) => {
                    this.passwordResetResponse = response.status
                    if(response.status == 201) {
                        this.setText(this.successHeader, this.successCopy)
                    } else {
                        this.setText(this.failureHeader, this.failureHeader)
                    }
                }
            )
    }

    submitNewPassword(event: string){
        this.passwordResetService
            .submitNewPassword(event, this.jwt)
            .subscribe((response) => {
                this.setText(this.resetSuccessHeader, this.resetSuccessCopy)
            },(error) => {
                if(error._body === '{"errors":["invalid token"]}'){
                    this.setText(this.resetErrorHeader, this.resetErrorCopy)
                } else if(error._body === '{"errors":["expired token"]}'){
                    this.setText(this.expiredHeader, this.expiredCopy)
                }
            })
        this.resetAction = 'submitted'
    }

    setText(header, copy){
        this.header = header
        this.copy = copy
    }


    welcomeHeader = 'Forgot Your Password?'
    welcomeCopy = 'No problem! Just enter your password below and we’ll send you a link to reset it.'
    successHeader = 'Thanks!'
    successCopy ='Click below to resend it if needed, and don\'t forget to check those pesky SPAM folders!'
    failureHeader = 'Error'
    failureCopy = 'An error has occurred, please contact support.'
    resetHeader = 'New Password Time!'
    resetCopy = 'Enter a new password that\'s at least 8 characters long.'
    resetSuccessHeader = 'All Good!'
    resetSuccessCopy = 'Your new password is set, let\'s go login'
    expiredHeader = 'Error'
    expiredCopy = 'Looks like that link is expired, please request a new password reset link'
    resetErrorHeader = 'Error'
    resetErrorCopy = 'Looks like there was a problem, please contact support'
}
