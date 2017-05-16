import { Component } from '@angular/core';

// Components
import { PasswordResetInstructionsComponent } from '../components/password-reset-instructions/password-reset-instructions.component';
import { PasswordResetFormComponent } from '../components/password-reset-form/password-reset-form.component';

// Services
import { PasswordResetService } from '../services/password-reset.service';

//interfaces
import { Credentials } from '../models/credentials.interface';

@Component({
    styleUrls: ['./password-reset.component.scss'],
    providers: [PasswordResetService],
  template: `
<div>
  <app-password-reset-instructions></app-password-reset-instructions>
  <app-password-reset-form
    (submitPasswordReset)="submitPasswordReset($event)">
  </app-password-reset-form>
</div>
`
})

export class PasswordResetComponent {
    constructor(private passwordResetService: PasswordResetService){}

    submitPasswordReset(event: Credentials){
        this.passwordResetService
            .resetPassword(event)
            .subscribe(
                (response: Response) => {
                    console.log(response);
                }
            )
    }
}
