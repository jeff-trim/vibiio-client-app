import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jcf from 'jcf';

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

    @Input() insuranceProviderList: any[];

    @Output()
    newPolicy: EventEmitter<InsurancePolicy> = new EventEmitter<InsurancePolicy>();

    @ViewChild('carrier') carrier: ElementRef;

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
