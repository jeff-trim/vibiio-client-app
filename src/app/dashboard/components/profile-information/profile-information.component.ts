import { Component, Input } from '@angular/core';
import { InsurancePolicyComponent } from '../insurance-policy/insurance-policy.component';

@Component({
    selector: 'profile-information',
    styleUrls: ['profile-information.component.scss'],
    templateUrl: 'profile-information.component.html'
})

export class ProfileInformationComponent  {
    @Input()
    myProfile
}
