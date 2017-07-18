import { validationMessages, errorMessages } from './validation-messages';

describe('Process form control error messages', () => {

  const errorObject = { required: true , minlength: true };
  const name = 'super input ';
  const errorArray: string[] = [];

  it('errorMessages function to be defined', () => expect(errorMessages).toBeDefined());

  it('should return an array of error messages', () => {
    let errors = errorMessages(errorObject, name, errorArray, validationMessages);

    expect(errors.length).toBe(2);
    expect(errors[0]).toBe('super input  is required.');
    expect(errors[1]).toBe('super input  must be at least 4 characters long.');
  });

  it('should not return any messages', () => {
    const noErrors = {};
    let errors = errorMessages(noErrors, name, errorArray, validationMessages);

    expect(errors.length).toBe(0);
  });

});
