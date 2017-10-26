import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MomentModule } from 'angular2-moment';

// Components
import { KeyValueComponent } from '../../components/key-value/key-value.component';
import { ProfileInformationComponent } from '../../components/profile-information/profile-information.component';
import { ProfileLicensureComponent } from '../../components/profile-licensure/profile-licensure.component';
import { ProfileNewLicensureComponent } from '../../components/profile-licensure/profile-new-licensure.component';

// Services
import { MyProfileService } from '../../services/my-profile.service';
import { MyProfileLicense } from '../../models/my-profile-license.interface';
import { MyLicenseService } from '../../services/my-license.service';

// Models
import { MyProfile } from '../../models/my-profile.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'my-profile',
  styleUrls: ['my-profile.component.scss'],
  templateUrl: 'my-profile.component.html'})

export class MyProfileComponent implements OnInit {
    myProfile: MyProfile;
    myLicenses: MyProfileLicense[];
    isSaving = false;

    @ViewChild (ProfileInformationComponent)
    private profileInformationChild: ProfileInformationComponent;

    @ViewChild (ProfileNewLicensureComponent)
    private profileNewLicensureChild: ProfileNewLicensureComponent;

    constructor(private myProfileService: MyProfileService,
                private myLicenseService: MyLicenseService,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.myProfile = data.myProfile.user;
            this.myLicenses = data.myProfile.user.profile.licenses;
        });
    }

    saveMyProfileForm() {
        this.isSaving = true;
        this.updateMyProfile(this.profileInformationChild.myProfileForm);
    }

    resetMyProfileForm() {
        this.myProfileService.getMyProfile()
            .subscribe( (data) => {
                this.myProfile = data.user;
            });
    }

    updateMyProfile(form) {
        const id = this.myProfile.id;
        const addressData = form.value.addressData;
        const userData = form.value.userData;

        const options = {
            first_name: userData.firstName,
            last_name: userData.lastName,
            company: userData.company,
            phone: userData.phone,
            address_one: addressData.addressOne,
            address_two: addressData.addressTwo,
            city: addressData.city,
            state: addressData.state,
            zip: addressData.zip
        };

        this.myProfileService.updateMyProfile(options)
            .subscribe( (data) => {
                this.myProfile = data.user;
                this.isSaving = false;
        });
    }

    // My License functions
    createLicense(form: FormGroup) {
        const options = {
            state: form.value.state,
            license_number: form.value.licenseNumber,
            vibiiographer_id: this.myProfile.id
        };

        this.myLicenseService.createLicense(options)
            .subscribe( (data) => {
                this.refreshLicenses();
                this.profileNewLicensureChild.myLicenseForm.reset();
            });
        }

    refreshLicenses() {
        this.myLicenseService.getMyLicenses()
            .subscribe( (data) => {
                this.myLicenses =  data.licenses;
            });
    }

}
