import { ValidatorFn } from '@angular/forms';

export interface Config {
    type: string;
    inputType?: string;
    label?: string;
    name: string;
    placeholder?: string;
    options?: Option[];
    value?: any;
    disabled?: boolean;
    validators?: ValidatorFn[];
}

export interface FormSetup {
    title: string;
    inputs: Config[];
}

export interface Option {
    label: string;
    value: string;
}
