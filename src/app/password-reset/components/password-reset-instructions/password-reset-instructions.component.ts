import { Component, SimpleChanges, Input  } from '@angular/core';

@Component({
  selector: 'app-password-reset-instructions',
  styleUrls: ['./password-reset-instructions.component.scss'],
    templateUrl: 'password-reset-instructions.component.html'
})

export class PasswordResetInstructionsComponent {
    @Input() header: string
    @Input() copy: string

  ngOnChanges(changes: SimpleChanges){
        this.header = changes.header.currentValue
        this.copy = changes.copy.currentValue
  }
}
