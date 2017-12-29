import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Config } from '../../models/config.interface';

import { validationMessages, errorMessages } from '../../models/validation-messages';

@Component({
    selector: 'form-select',
    styleUrls: ['form-select.component.scss'],
    template: `
     <div class="select-wrapper">
        <div
        class="dynamic-field form-input signup-select"
        [formGroup]="group">
            <label>{{ config.label }}</label>
            <select [formControlName]="config.name"
                    [class.error-message]="errorArray.length > 0"
                    jcf>
                <option [ngValue]="config.value" disabled>{{ config.placeholder }}</option>
                <option value="{{ option.value }}" *ngFor="let option of config.options">
                    {{ option.label }}
                </option>
            </select>
        </div>
        <div *ngIf="control.errors && !control.pristine">
            <p *ngFor="let error of errorArray">{{ error }}</p>
        </div>
        <span class="pink-underline"></span>
      </div>
    `
})

export class FormSelectComponent implements OnInit {
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
