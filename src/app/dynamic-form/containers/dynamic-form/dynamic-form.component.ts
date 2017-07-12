import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Config } from '../../models/config.interface';

@Component({
    selector: 'dynamic-form',
    template: `
      <form
        class="dynamic-form"
        [formGroup]="form"
        (ngSubmit)="formSubmit(form.value)">
        <ng-content></ng-content>
        <ng-container
          *ngFor="let field of config;"
          dynamicField
          [config]="field"
          [group]="form">
        </ng-container>
      </form>
    `
})

export class DynamicFormComponent implements OnInit {
    @Input()
    config: Config[] = [];

    form: FormGroup;

    @Output()
    submitted: EventEmitter<any> = new EventEmitter<any>();

    constructor( private fb: FormBuilder ) { }

    ngOnInit() {
      this.form = this.createGroup();
    }

    createGroup() {
       const group = this.fb.group({});
       this.config
           .forEach(
             control => group.addControl(control.name,
                                         this.fb.control(
                                         { value: control.value, disabled: control.disabled }, control.validators))
           );

       return group;
    }

    formSubmit(value) {
      this.submitted.emit(value);
    }
}