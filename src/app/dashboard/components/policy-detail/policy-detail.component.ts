import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models
import { InsurancePolicy } from '../../models/insurance-policy.interface';
import { InsurancePolicyService } from '../../services/insurance-policy.service';
import { InsuranceStatusService } from '../../services/insurance-status.service';

@Component({
    selector: 'vib-policy-detail',
    templateUrl: 'policy-detail.component.html',
    styleUrls: ['policy-detail.component.scss']
})

export class PolicyDetailComponent implements OnInit {
    @Input() policy?: InsurancePolicy;
    @Input() onEdit= false;

    editForm: FormGroup;

    constructor(private fb: FormBuilder,
                private policyService: InsurancePolicyService,
                private insuranceStatusService: InsuranceStatusService) {
    }

    ngOnInit() {
        if (this.policy) {
            this.editForm = this.fb.group({
                'carrier': [this.policy.carrier, Validators.required],
                'policy_number': [this.policy.policy_number, Validators.required],
                'claim_id': [this.policy.claim_id, Validators.required],
                'consumer_id': [this.policy.consumer_id, Validators.required],
                'id': [this.policy.id, Validators.required]
            });
        }
    }


    onSubmit() {
        this.policyService.updatePolicy(this.editForm.value)
        .subscribe( (data) => {
          this.policy = Object.assign( {}, this.policy, data.policy);
          this.insuranceStatusService.updateStatus(false);
          this.insuranceStatusService.editStatus(false);
        },
        (error: any) => {
          console.log( 'error updating policy' );
          this.insuranceStatusService.editStatus(false);
          this.insuranceStatusService.updateStatus(false);
      });
    }

    resetForm() {
        this.editForm.patchValue(this.policy);
    }
}
