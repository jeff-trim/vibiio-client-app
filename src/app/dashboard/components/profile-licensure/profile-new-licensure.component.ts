import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';

@Component({
    selector: 'profile-new-licensure',
    styleUrls: ['profile-new-licensure.component.scss'],
    templateUrl: 'profile-new-licensure.component.html'
})

export class ProfileNewLicensureComponent {
    myLicenseForm: FormGroup;

    @Output()
    sumbitLicenseForm = new EventEmitter<any>();

    constructor() {
        this.myLicenseForm = new FormGroup({
                'state': new FormControl('', Validators.required),
                'licenseNumber': new FormControl('', Validators.required)
        });
    }

    onSubmit() {
        this.sumbitLicenseForm.emit(this.myLicenseForm);
    }
}
