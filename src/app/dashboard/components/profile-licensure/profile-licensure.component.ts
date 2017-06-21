import { Component, Input } from '@angular/core';

@Component({
    selector: 'profile-licensure',
    styleUrls: ['profile-licensure.component.scss'],
    templateUrl: 'profile-licensure.component.html'
})

export class ProfileLicensureComponent {
    @Input()
    myProfile
    licenses

    ngOnInit(){
        this.licenses = this.myProfile.profile.licenses
    }
}
