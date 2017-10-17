import { Component, Input } from '@angular/core';

// Models
import { MyProfileLicense } from '../../models/my-profile-license.interface';

@Component({
    selector: 'profile-information',
    styleUrls: ['profile-information.component.scss'],
    templateUrl: 'profile-information.component.html'
})

export class ProfileInformationComponent  {
    @Input()
    myProfile: MyProfileLicense;
}
