import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Models
import { MyProfile } from '../../models/my-profile.interface';

@Component({
    selector: 'profile-information',
    styleUrls: ['profile-information.component.scss'],
    templateUrl: 'profile-information.component.html'
})

export class ProfileInformationComponent implements OnInit {
    @Input()
    myProfile: MyProfile;

    updateProfile: EventEmitter<FormGroup> = new EventEmitter;

    myProfileForm: FormGroup;

    ngOnInit() {
        this.myProfileForm = new FormGroup({
            'userData': new FormGroup ({
                'firstName': new FormControl('', Validators.required),
                'lastName': new FormControl('', Validators.required),
                'company': new FormControl('', Validators.required),
                'phone': new FormControl('', Validators.required)
            }),
            'addressData': new FormGroup ({
                'addressOne': new FormControl('', Validators.required),
                'addressTwo': new FormControl('', Validators.required),
                'city': new FormControl('', Validators.required),
                'state': new FormControl('', Validators.required),
                'zip': new FormControl('', Validators.required)
            })
        });
    }

    resetToDefault() {
        this.myProfileForm.setValue({
            userData: {
                firstName: this.myProfile.first_name,
                lastName: this.myProfile.last_name,
                company: this.myProfile.company,
                phone: this.myProfile.phone,
            },
            addressData: {
                addressOne: this.myProfile.address.address_one,
                addressTwo: this.myProfile.address.address_two,
                city: this.myProfile.address.city,
                state: this.myProfile.address.state,
                zip: this.myProfile.address.zip
            }
        });
    }
}
