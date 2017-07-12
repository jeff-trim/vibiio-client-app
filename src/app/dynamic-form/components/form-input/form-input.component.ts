import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Config } from '../../models/config.interface';

import { validationMessages, errorMessages } from '../../models/validation-messages';

@Component({
    selector: 'form-input',
    styleUrls: ['form-input.component.scss'],
    template: `
      <div 
       class="dynamic-field form-input" 
       [formGroup]="group">
         <label>{{ config.label }}</label>
         <input
          [attr.type]="config.inputType"
          [attr.placeholder]="config.placeholder"
          [formControlName]="config.name"
          [class.error-message]="errorArray.length > 0" />
      </div>
      <div *ngIf="control.errors && !control.pristine">
        <p *ngFor="let error of errorArray">{{ error }}</p>
      </div>
    `
})

export class FormInputComponent implements OnInit {
    config: Config;
    group: FormGroup;
    errorMessages: {} = validationMessages;
    control: AbstractControl;
    errorArray: string[] = [];
    handleErrors;

    constructor() {
        this.handleErrors = errorMessages;
     }

    ngOnInit() {
        this.control = this.group.get(this.config.name);
        this.control.valueChanges
                    .subscribe((value) => {
                        this.errorArray = this.handleErrors(this.control.errors,
                                                            this.config.name,
                                                            this.errorArray,
                                                            this.errorMessages);
                    });
    }

}
