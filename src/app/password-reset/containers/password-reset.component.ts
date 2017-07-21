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
            }
        })
        this.setText(this.welcomeHeader, this.welcomeCopy)
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
        console.log(event)
        this.passwordResetService
            .submitNewPassword(event, this.jwt)
            .subscribe(
                (response: Response) => {
                    console.log(response)
                }
            )
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
}
