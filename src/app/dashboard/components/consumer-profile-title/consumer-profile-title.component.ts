import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { ConsumerProfile } from '../../models/consumer-profile.interface';

@Component({
    selector: 'vib-consumer-profile-title',
    templateUrl: 'consumer-profile-title.component.html',
    styleUrls: ['consumer-profile-title.component.scss']
})

export class ConsumerProfileTitleComponent {
    @Input()
    consumerProfile: ConsumerProfile;

    constructor(private router: Router) { }

    viewDetails() {
        this.router.navigateByUrl(`/dashboard/appointment/${this.consumerProfile.appointment_id}`);
        console.log(this.consumerProfile.appointment_id);
    }
}
