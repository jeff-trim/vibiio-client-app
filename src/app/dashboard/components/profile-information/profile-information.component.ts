import { Component, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// Models
import { MyProfileLicense } from '../../models/my-profile-license.interface';
import { MyProfileService } from '../../services/my-profile.service';
import { MyProfile } from '../../models/my-profile.interface';

@Component({
    selector: 'profile-information',
    styleUrls: ['profile-information.component.scss'],
    templateUrl: 'profile-information.component.html'
})

export class ProfileInformationComponent  {
    @Input()
    myProfile: MyProfile;

    updateProfile: EventEmitter<FormGroup> = new EventEmitter;

    myProfileForm: FormGroup;

    constructor() {
        this.myProfileForm = new FormGroup({
            'userData': new FormGroup ({
                'firstName': new FormControl(),
                'lastName': new FormControl(),
                'company': new FormControl(),
                'phone': new FormControl()
            }),
            'addressData': new FormGroup ({
                'address_one': new FormControl(),
                'address_two': new FormControl(),
                'city': new FormControl(),
                'state': new FormControl(),
                'zip': new FormControl(),
            })
        });
    }
}
