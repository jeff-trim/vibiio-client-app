import { Validators } from '@angular/forms';

export const inputConfig = [
      {
        type: 'input',
        inputType: 'text',
        name: 'name',
        value: 'bob',
        placeholder: 'Enter your name',
        validators: [
          Validators.required
        ]
      },
      {
        type: 'select',
        name: 'county',
        options: [ { label: 'broward', value: 'broward' }, { label: 'miami-dade', value: 'miami-dade' } ],
        placeholder: 'Select a county',
        validators: [
          Validators.required
        ]
      },
      {
        label: 'Submit',
        name: 'submit',
        type: 'button',
        disabled: true
      }
    ];
