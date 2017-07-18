import { Config, FormSetup } from '../../dynamic-form/models/config.interface';
import { Validators } from '@angular/forms';
import { Note } from '../models/consumer-note.interface';
import { Input } from '@angular/core';

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

export const newNotesForm: FormSetup  = {
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
