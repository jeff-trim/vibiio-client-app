import { Component, Input, OnInit, EventEmitter } from '@angular/core';

// Models
import { MyProfileLicense } from '../../models/my-profile-license.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'vib-profile-licensure',
    styleUrls: ['profile-licensure.component.scss'],
    templateUrl: 'profile-licensure.component.html'
})

export class ProfileLicensureComponent implements OnInit {
    editForm: FormGroup;
    @Input() license: MyProfileLicense;

    updateLicense = new EventEmitter<MyProfileLicense>();

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.editForm = this.fb.group({
            'id': [this.license.id, Validators.required],
            'state': [this.license.state, Validators.required],
            'license_number': [this.license.license_number, Validators.required],
            'vibiiographer_id': [this.license.vibiiographer_id, Validators.required]
        });
    }
}
