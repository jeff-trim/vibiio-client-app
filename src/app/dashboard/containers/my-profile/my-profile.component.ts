import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

// Components
import { KeyValueComponent } from '../../components/key-value/key-value.component';
import { ProfileInformationComponent } from '../../components/profile-information/profile-information.component';
import { ProfileLicensureComponent } from '../../components/profile-licensure/profile-licensure.component';
import { MomentModule } from 'angular2-moment';

// Services
import { MyProfileService } from '../../services/my-profile.service';
import { MyProfile } from '../../models/my-profile.interface';
import { MyProfileLicense } from '../../models/my-profile-license.interface';

@Component({
  selector: 'my-profile',
  styleUrls: ['my-profile.component.scss'],
  templateUrl: 'my-profile.component.html'})

export class MyProfileComponent implements OnInit {
    myProfile: MyProfile;
    myLicenses: MyProfileLicense[];

    @ViewChild (ProfileInformationComponent)
    private profileInformationChild: ProfileInformationComponent;

    @ViewChild (ProfileLicensureComponent)
    private profileInformationComponent: ProfileLicensureComponent;

    constructor(private myProfileService: MyProfileService,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.myProfile = data.myProfile.user;
            this.myLicenses = data.myProfile.user.profile.licenses;
        });
    }

    saveMyProfileForm() {
        this.updateMyProfile(this.profileInformationChild.myProfileForm);
    }

    updateMyProfile(form) {
        const id = this.myProfile.id;
        const addressData = form.value.addressData;
        const userData = form.value.userData;

        const options = {
            id: id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            company: userData.company,
            cellPhone: userData.phone,
            address_one: addressData.address_one,
            address_two: addressData.address_two,
            city: addressData.city,
            state: addressData.state,
            zip: addressData.zip
        };

        this.myProfileService.updateMyProfile(options).subscribe( (data) => {
            this.myProfile = data.user;
        });
    }
}
