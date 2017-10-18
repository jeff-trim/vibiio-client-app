import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';

@Component({
    selector: 'profile-new-licensure',
    styleUrls: ['profile-new-licensure.component.scss'],
    templateUrl: 'profile-new-licensure.component.html'
})

export class ProfileNewLicensureComponent implements OnInit {
    myLicenseForm: FormGroup;

    @Output()
    sumbitLicenseForm = new EventEmitter<any>();

    ngOnInit() {
        this.myLicenseForm = new FormGroup({
                'state': new FormControl('', Validators.required),
                'licenseNumber': new FormControl('', Validators.required)
        });
    }

    onSubmit() {
        this.sumbitLicenseForm.emit(this.myLicenseForm);
    }
}
