import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models
import { InsurancePolicy } from '../../models/insurance-policy.interface';

@Component({
    selector: 'vib-policy-detail',
    templateUrl: 'policy-detail.component.html',
    styleUrls: ['policy-detail.component.scss']
})

export class PolicyDetailComponent implements OnInit {
    @Input() policy?: InsurancePolicy;

    @Output() editPolicy = new EventEmitter<boolean>();
    @Output() updatePolicy = new EventEmitter<InsurancePolicy>();

    editForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        if (this.policy) {
            this.editForm = this.fb.group({
                'carrier': [this.policy.carrier, Validators.required],
                'policy_numer': [this.policy.policy_number, Validators.required],
                'claim_id': [this.policy.claim_id, Validators.required],
                'consumer_id': [this.policy.consumer_id, Validators.required],
                'id': [this.policy.id, Validators.required]
            });
        }
    }

    isEditing() {
        this.editPolicy.emit(true);
    }

    onSubmit() {
        if (this.editForm.valid) {
            this.updatePolicy.emit(this.editForm.value);
        }
    }
}
