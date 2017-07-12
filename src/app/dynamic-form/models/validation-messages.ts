export const validationMessages = {
                'required': 'is required.',
                'minlength':  'must be at least 4 characters long.',
                'maxlength':  'cannot be more than 24 characters long.',
                'pattern':  'is not valid'
             };

export function errorMessages(errorsObject, name, errorArray, errorMessages): string[] {
        if (errorsObject) {
            errorArray = [];
            const keys = Object.keys(errorsObject);
            keys.forEach( key => {
               const error = name + ' ' + errorMessages[key];
               errorArray.push(error);
            });
        }

        return errorArray;
    }