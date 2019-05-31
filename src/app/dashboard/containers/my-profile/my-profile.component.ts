import { Component, Input, OnInit, AfterViewChecked, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
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

@Component({
    selector: 'vib-my-profile',
    styleUrls: ['my-profile.component.scss'],
    templateUrl: 'my-profile.component.html'
})

export class MyProfileComponent implements OnInit, AfterViewChecked {
    myProfile: MyProfile;
    myLicenses: MyProfileLicense[];
    isSaving = false;
    addLicensureForm = false;
    isEditing = false;
    receivingTexts: boolean;
    availableLanguages = ['english', 'spanish', 'french'];

    @ViewChild(ProfileInformationComponent)
    private profileInformationChild: ProfileInformationComponent;

    @ViewChild(ProfileNewLicensureComponent)
    private profileNewLicensureChild: ProfileNewLicensureComponent;

    @ViewChildren(ProfileLicensureComponent)
    private profileLicenesesChildren: QueryList<ProfileLicensureComponent>;

    constructor(private myProfileService: MyProfileService,
        private myLicenseService: MyLicenseService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.myProfile = data.myProfile.user;
            this.receivingTexts = data.myProfile.user.receive_texts;
            this.myLicenses = data.myProfile.user.profile.licenses;
        });
    }

    ngAfterViewChecked() {
        this.profileInformationChild.myProfileForm.valueChanges
            .subscribe(data => {
                this.isEditing = true;
            });

        this.profileLicenesesChildren.forEach(license => {
            license.editForm.valueChanges
                .subscribe(data => {
                    this.isEditing = true;
                });
        });
    }

    saveForms() {
        this.isSaving = true;
        this.updateLicences();
        this.updateMyProfile(this.profileInformationChild.myProfileForm);
        this.isSaving = false;
        this.isEditing = false;
    }

    updateLicences() {
        this.profileLicenesesChildren.forEach(license => {
            if (license.editForm.dirty && license.editForm.valid) {
                this.myLicenseService.updateMyLicense(license.editForm.value)
                    .subscribe((data) => {
                        license.license = data.license;
                        this.isEditing = false;
                    });
            }
        });
    }

    resetForms() {
        this.refreshProfile();
        this.refreshLicenses();
        this.isEditing = false;
    }

    refreshProfile() {
        this.myProfileService.getMyProfile()
            .subscribe((data) => {
                this.profileInformationChild.myProfileForm.patchValue(data.user);
                this.isEditing = false;
            });
    }

    refreshLicenses() {
        this.myLicenseService.getMyLicenses()
            .subscribe((data) => {
                this.myLicenses = data.licenses;
                this.isEditing = false;
            });
        this.profileLicenesesChildren.forEach(licenseForm => {
            licenseForm.editForm.patchValue(licenseForm.license);
        });
    }

    updateMyProfile(form) {
        const id = this.myProfile.id;

        const options = {
            first_name: form.value.firstName,
            last_name: form.value.lastName,
            phone: form.value.phone,
            address_one: form.value.addressOne,
            address_two: form.value.addressTwo,
            city: form.value.city,
            state: form.value.state,
            zip: form.value.zip
        };

        this.sendProfileUpdateData(options);
    }

    sendProfileUpdateData(options: any) {
        this.myProfileService.updateMyProfile(options)
            .subscribe((data) => {
                this.myProfile = data.user;
                this.isEditing = false;
            });
    }

    updateLanguages(languages: string[]): void {
        const options = {
            languages: languages
        };

        this.sendProfileUpdateData(options);
    }

    toggleLicensureForm() {
        this.addLicensureForm = !this.addLicensureForm;
    }

    toggleReceiveTexts() {
        this.receivingTexts = !this.receivingTexts;
        const isReceiving = this.receivingTexts;
        const options = { receive_texts: isReceiving };

        this.myProfileService.updateMyProfile(options)
            .subscribe((data) => {
                this.receivingTexts = data.user.receive_texts;
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
            .subscribe((data) => {
                this.refreshLicenses();
                this.profileNewLicensureChild.myLicenseForm.reset();
                this.addLicensureForm = false;
            });
    }

    closeForm(event) {
        this.addLicensureForm = event;
    }
}
