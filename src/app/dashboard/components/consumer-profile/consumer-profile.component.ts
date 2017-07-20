import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

// Models
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { InsurancePolicy } from '../../models/insurance-policy.interface';

@Component({
    selector: 'consumer-profile',
    templateUrl: 'consumer-profile.component.html',
    styleUrls: ['consumer-profile.component.scss']
})

export class ConsumerProfileComponent implements OnInit {
    @Input()
    consumerProfile: ConsumerProfile;

    insurance_policy: InsurancePolicy;

    ngOnInit() {
        this.insurance_policy = this.consumerProfile.insurance_policy;
    }

}
