import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'profile-new-licensure',
    styleUrls: ['profile-new-licensure.component.scss'],
    templateUrl: 'profile-new-licensure.component.html'
})

export class ProfileNewLicensureComponent {
    myLicenseForm: FormGroup;

    constructor() {
        this.myLicenseForm = new FormGroup({
                'state': new FormControl(),
                'licenseNumber': new FormControl()
        });
    }
}
