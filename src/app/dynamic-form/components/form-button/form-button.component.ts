import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Config } from '../../models/config.interface';



@Component({
    selector: 'form-input',
    styleUrls: ['form-button.component.scss'],
    template: `
      <div 
       class="dynamic-field form-input" 
       [formGroup]="group">
         <button
          type="submit">
          {{ config.name }}
         </button>
      </div>
    `
})

export class FormButtonComponent implements OnInit {
    config: Config;
    group: FormGroup;

    constructor() { }

    ngOnInit() { }
}