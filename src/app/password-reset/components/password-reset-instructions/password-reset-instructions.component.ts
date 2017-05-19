import { Component, SimpleChanges, Input  } from '@angular/core';

@Component({
  selector: 'app-password-reset-instructions',
  styleUrls: ['./password-reset-instructions.component.scss'],
  template: `
    <div [class.invisible]="resetResponse">
      <div class="logo"></div>
      <div class="welcome">
        <h1>Forgot Your Password?</h1>
      </div>
      <div class="message">
        <p>💁 No problem! Just enter your password below and we’ll send you a link to reset it.</p>
      </div>
    </div>
    <div [style.display]="resetResponse === 201 ? 'block' : 'none'">
      <div class="logo"></div>
      <div class="welcome">
        <h1>Thanks!</h1>
      </div>
      <div class="message">
        <p>👌 The link will be emailed to you soon.</p>
        <p>Click below to resend it if needed, and don't forget to check those pesky SPAM folders!</p>
      </div>
    </div>
    <div [style.display]="resetResponse !== 201 && resetResponse > 0 ? 'block' : 'none'">
      <div class="logo"></div>
      <div class="welcome">
        <h1>Error</h1>
      </div>
      <div class="message">
        <p>👌 The link will be emailed to you soon.</p>
        <p>Click below to resend it if needed, and don't forget to check those pesky SPAM folders!</p>
      </div>
    </div>
    `
})

export class PasswordResetInstructionsComponent {

    @Input()
    resetResponse: number

    ngOnChanges(changes: SimpleChanges){
      this.resetResponse
      console.log(this.resetResponse)
    }
}
