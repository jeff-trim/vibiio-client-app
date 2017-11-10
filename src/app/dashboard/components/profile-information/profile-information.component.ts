import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Models
import { MyProfileLicense } from '../../models/my-profile-license.interface';
import { MyProfileService } from '../../services/my-profile.service';
import { MyProfile } from '../../models/my-profile.interface';

@Component({
    selector: 'vib-profile-information',
    styleUrls: ['profile-information.component.scss'],
    templateUrl: 'profile-information.component.html'
})

export class ProfileInformationComponent implements OnInit {
    myProfileForm: FormGroup;

    @Input() onEdit = false;
    @Input() myProfile: MyProfile;

    updateProfile: EventEmitter<FormGroup> = new EventEmitter;

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
}
