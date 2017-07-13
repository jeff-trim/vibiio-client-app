import { Config, FormSetup } from '../../dynamic-form/models/config.interface';
import { Validators } from '@angular/forms';

export const statusSelector: FormSetup = {
    title: 'Claim Status',
    inputs: [
    {
        type: 'select',
        inputType: 'select',
        name: 'claim_status',
        placeholder: 'Claim Status',
        options: [ 'scheduled', 'claim in progress', 'completed'],
    },
   ]
};

export const notesForm: FormSetup  = {
    title: 'Notes',
    inputs: [
      {
        type: 'input',
        inputType: 'text',
        name: 'notes',
        placeholder: 'Type your notes here'
      }
    ]
};
