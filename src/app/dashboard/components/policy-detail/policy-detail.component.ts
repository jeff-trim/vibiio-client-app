import { Component, Input } from '@angular/core';

// Models
import { InsurancePolicy } from '../../models/insurance-policy.interface';

@Component({
    selector: 'vib-policy-detail',
    templateUrl: 'policy-detail.component.html',
    styleUrls: ['policy-detail.component.scss']
})

export class PolicyDetailComponent {
    @Input()
    policy?: InsurancePolicy;
}
