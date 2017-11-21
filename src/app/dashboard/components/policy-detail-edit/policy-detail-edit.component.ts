import { Component, Input } from '@angular/core';
import { Form } from '@angular/forms';

// Services
import { InsurancePolicyService } from '../../services/insurance-policy.service';

// Models
import { InsurancePolicy } from '../../models/insurance-policy.interface';

@Component({
    selector: 'vib-policy-detail-edit',
    templateUrl: 'policy-detail-edit.component.html',
    styleUrls: ['policy-detail-edit.component.scss']
})

export class PolicyDetailEditComponent {
    @Input()
    policy?: InsurancePolicy;

    constructor(private updateService: InsurancePolicyService) { }

    onSubmit(policy: InsurancePolicy) {
        const options = {
            carrier: policy.carrier,
            policy_number: policy.policy_number,
            claim_id: policy.claim_id
        };

        this.updateService
            .updatePolicy(options)
            .subscribe( (data) => {
                this.policy = data.insurance_policy;
            },
            (error: any) => {
                console.log( 'error updating note' );
        });
    }
}
