import { Component, OnInit, Input } from '@angular/core';
import { Form } from '@angular/forms';

// Services
import { InsurancePolicyUpdateService } from '../../services/insurance-policy-update.service';

// Models
import { InsurancePolicy } from '../../models/insurance-policy.interface';

@Component({
    selector: 'vib-policy-detail-form',
    templateUrl: 'policy-detail.component.html',
    styleUrls: ['policy-detail.component.scss']
})

export class PolicyDetailComponent implements OnInit {
    @Input()
    policy: InsurancePolicy;

    constructor(private updateService: InsurancePolicyUpdateService ) { }

    ngOnInit() { }

    onSubmit(policy: InsurancePolicy) {
        const options = {
            carrier: policy.carrier,
            policy_number: policy.policy_number,
            claim_id: policy.claim_id
        };

        this.updateService
            .updatePolicy(options, policy.id)
            .subscribe( (data) => {
                this.policy = data.insurance_policy;
            },
            (error: any) => {
                console.log( 'error updating note' );
        });
    }
}
