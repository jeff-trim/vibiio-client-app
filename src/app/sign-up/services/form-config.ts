import { Config, FormSetup } from '../../dynamic-form/models/config.interface';
import { Validators } from '@angular/forms';

export const consumerSignUp: FormSetup  = {
  title: 'Sign Up',
  inputs: [
    {
      type: 'input',
      inputType: 'text',
      name: 'first_name',
      placeholder: 'First Name',
      validators: [
        Validators.required
      ]
    },
    {
      type: 'input',
      inputType: 'text',
      name: 'last_name',
      placeholder: 'Last Name',
      validators: [
        Validators.required
      ]
    },
    {
      label: 'Submit',
      name: 'Create User',
      type: 'button'
    }
  ]
};
