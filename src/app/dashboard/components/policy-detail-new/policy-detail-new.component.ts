import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Models
import { InsurancePolicy } from '../../models/insurance-policy.interface';

@Component({
  selector: 'vib-policy-detail-new',
  templateUrl: './policy-detail-new.component.html',
  styleUrls: ['./policy-detail-new.component.scss']
})

export class PolicyDetailNewComponent {
    newPolicyForm: FormGroup;
    policy: InsurancePolicy;

    @Output()
    newPolicy: EventEmitter<InsurancePolicy> = new EventEmitter<InsurancePolicy>();

    constructor() {
        this.newPolicyForm = new FormGroup({
            'carrier': new FormControl('', Validators.required),
            'policy_number': new FormControl('', Validators.required)
        });
     }

    onSubmit() {
        if (this.newPolicyForm.valid) {
            this.newPolicy.emit(this.newPolicyForm.value);
        }
    }
}
