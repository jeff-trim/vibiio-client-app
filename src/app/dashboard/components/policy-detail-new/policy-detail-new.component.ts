import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Services
import { InsurancePolicyService } from '../../services/insurance-policy.service';

// Models
import { InsurancePolicy } from '../../models/insurance-policy.interface';

@Component({
  selector: 'vib-policy-detail-new',
  templateUrl: './policy-detail-new.component.html',
  styleUrls: ['./policy-detail-new.component.scss']
})

export class PolicyDetailNewComponent {
    policy?: InsurancePolicy;

    @Input()
    consumerId: number;

    @Input()
    vibiioId: number;

    constructor(private policyService: InsurancePolicyService ) { }

    onSubmit(form: FormGroup) {
      const options = {
            carrier: form.value.carrier,
            policy_number: form.value.policy_number,
            claim_id: form.value.claim_id,
            consumer_id: this.consumerId,
            vibiio_id: this.vibiioId
        };

        this.policyService
            .newPolicy(options)
            .subscribe( (data) => {
                this.policy = data.insurance_policy;
            },
            (error: any) => {
                console.log( 'error updating note' );
        });
    }
}
