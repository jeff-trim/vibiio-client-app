import { ValidatorFn } from '@angular/forms';

export interface Config {
    type: string;
    inputType?: string;
    label?: string;
    name: string;
    placeholder?: string;
    options?: Select[];
    value?: any;
    disabled?: boolean;
    validators?: ValidatorFn[];
}

export interface FormSetup {
    title: string;
    inputs: Config[];
}

export interface Select {
    label: string;
    value: string;
}
