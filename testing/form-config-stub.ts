import { Validators } from '@angular/forms';

export let consumerSignUpStub = {
  title: 'Sign Up',
  inputs: [
    {
      type: 'input',
      inputType: 'hidden',
      name: 'profile_type',
      value: 'consumer',
    },
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
      type: 'select',
      name: 'carrier',
      options: [],
      placeholder: 'Provider',
      validators: [
        Validators.required,
      ]
    }
  ]
};

