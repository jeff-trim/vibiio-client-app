import { Component } from '@angular/core';
import { PasswordResetInstructionsComponent } from '../components/password-reset-instructions/password-reset-instructions.component';
import { PasswordResetFormComponent } from '../components/password-reset-form/password-reset-form.component';
@Component({
  styleUrls: ['./password-reset.component.scss'],
  template: `
<div>
  <app-password-reset-instructions></app-password-reset-instructions>
  <app-password-reset-form></app-password-reset-form>
</div>
`
})

export class PasswordResetComponent {}
