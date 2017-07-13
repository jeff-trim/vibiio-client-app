import { ValidatorFn } from '@angular/forms';

export interface Config {
    type: string;
    inputType?: string;
    label?: string;
    name: string;
    placeholder?: string;
    options?: string[];
    value?: any;
    disabled?: boolean;
    validators?: ValidatorFn[];
}

export interface FormSetup {
    title: string;
    inputs: Config[];
}
