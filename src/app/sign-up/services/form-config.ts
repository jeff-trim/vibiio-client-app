import { Config } from '../../dynamic-form/models/config.interface';
import { Validators } from '@angular/forms';

export const consumerSignUp = {
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
      type: 'input',
      inputType: 'text',
      name: 'last_name',
      placeholder: 'Last Name',
      validators: [
        Validators.required
      ]
    },
    {
      type: 'input',
      inputType: 'email',
      name: 'email',
      placeholder: 'Email Address',
      validators: [
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}')
      ]
    },
    {
      type: 'input',
      inputType: 'phone',
      name: 'phone',
      placeholder: 'Phone Number',
      validators: [
        Validators.required,
        Validators.minLength(10),
      ]
    },
    {
      type: 'input',
      inputType: 'text',
      name: 'address_one',
      placeholder: 'Address',
      validators: [
        Validators.required
      ]
    },
    {
      type: 'input',
      inputType: 'text',
      name: 'address_two',
      placeholder: 'Address Two',
    },
    {
      type: 'input',
      inputType: 'text',
      name: 'city',
      placeholder: 'City',
      validators: [
        Validators.required
      ]
    },
    {
      type: 'input',
      inputType: 'text',
      name: 'state',
      placeholder: 'State',
      validators: [
        Validators.required
      ]
    },
    {
      type: 'input',
      inputType: 'text',
      name: 'zip',
      placeholder: 'Zip Code',
      validators: [
        Validators.required,
        Validators.minLength(5)
      ]
    },
    {
      type: 'input',
      inputType: 'text',
      name: 'carrier',
      placeholder: 'Provider',
      validators: [
        Validators.required,
      ]
    },
    {
      type: 'input',
      inputType: 'text',
      name: 'acct_number',
      placeholder: 'Policy Number',
      validators: [
        Validators.required,
      ]
    },
    {
      type: 'input',
      inputType: 'password',
      name: 'password',
      placeholder: 'Password',
      validators: [
        Validators.required,
        Validators.minLength(7)
      ]
    },
    {
      label: 'Submit',
      name: 'Create User',
      type: 'button'
    }
  ]
};
