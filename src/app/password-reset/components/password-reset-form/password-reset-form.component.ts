import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-password-reset-form',
  styleUrls: ['password-reset-form.component.scss'],
  template: `
<div>
  <form #form="ngForm" novalidate>
    PASSWORD RESET FORM
  </form>
</div>
`
})

export class PasswordResetFormComponent {

  @Output()
  submitPasswordReset: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
}
