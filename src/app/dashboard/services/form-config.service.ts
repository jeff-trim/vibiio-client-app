import { Injectable } from '@angular/core';
import { Config, FormSetup } from '../../dynamic-form/models/config.interface';
import { Validators } from '@angular/forms';
import { statusSelector, newNotesForm } from './form-config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FormConfigService {

    constructor() { }

    statusSelectForm() {
        return statusSelector;
    }

    newNotesForm() {
        return newNotesForm;
    }
}
