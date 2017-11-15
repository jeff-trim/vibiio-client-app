import { Component, Input } from '@angular/core';

// Models
import { MyProfileLicense } from '../../models/my-profile-license.interface';

@Component({
    selector: 'vib-profile-licensure',
    styleUrls: ['profile-licensure.component.scss'],
    templateUrl: 'profile-licensure.component.html'
})

export class ProfileLicensureComponent {
    @Input() licenses: MyProfileLicense[];
}
