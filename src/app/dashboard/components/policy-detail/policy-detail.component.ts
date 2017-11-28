import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models
import { InsurancePolicy } from '../../models/insurance-policy.interface';
import { InsuranceStatusService } from '../../services/insurance-status.service';
import { FormControl } from '@angular/forms/src/model';

@Component({
    selector: 'vib-policy-detail',
    templateUrl: 'policy-detail.component.html',
    styleUrls: ['policy-detail.component.scss']
})

export class PolicyDetailComponent implements OnInit, OnDestroy {
    editForm: FormGroup;
    alive: boolean;

    @Input() policy?: InsurancePolicy;
    @Input() onEdit= false;

    constructor(private fb: FormBuilder,
                private insuranceStatusService: InsuranceStatusService) {
    }

    ngOnInit() {
        this.alive = true;
        this.insuranceStatusService.onEdit$
            .takeWhile(() => this.alive)
            .subscribe(
            data => {
                this.onEdit = Object.assign({}, this.onEdit, data);
            });
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

    resetForm() {
        this.editForm.patchValue(this.policy);
    }

    ngOnDestroy() {
        this.alive = false;
    }

    checkErrors(field: FormControl): boolean {
        return (field.invalid);
      }
}
