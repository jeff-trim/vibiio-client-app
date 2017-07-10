import { Component, Input, Output, EventEmitter } from '@angular/core';

// Models
import { ConsumerProfile } from '../../models/consumer-profile.interface';

@Component({
    selector: 'consumer-profile-title',
    templateUrl: 'consumer-profile-title.component.html',
    styleUrls: ['consumer-profile-title.component.scss']
})

export class ConsumerProfileTitleComponent {
    @Input()
    consumerProfile: ConsumerProfile;
}
