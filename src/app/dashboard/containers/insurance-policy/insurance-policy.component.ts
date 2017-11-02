import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { InsurancePolicy } from '../../models/insurance-policy.interface';
import { InsurancePolicyService } from '../../services/insurance-policy.service';
import { PolicyDetailNewComponent } from '../../components/policy-detail-new/policy-detail-new.component';
import { PolicyDetailComponent } from '../../components/policy-detail/policy-detail.component';

@Component({
  selector: 'vib-insurance-policy',
  templateUrl: './insurance-policy.component.html',
  styleUrls: ['./insurance-policy.component.scss']
})

export class InsurancePolicyComponent {
  isSaving: boolean;
  showNewForm = false;
  formValid: boolean;

  @Input() insurancePolicies?: InsurancePolicy[];
  @Input() consumerId: number;

  @Output() isUpdating = new EventEmitter<boolean>();
  @Output() isEditing = new EventEmitter<boolean>();

  @ViewChild(PolicyDetailNewComponent)
  newPolicyChild: PolicyDetailNewComponent;

  @ViewChild(PolicyDetailComponent)
  updatePolicyChild: PolicyDetailComponent;

  constructor(private policyService: InsurancePolicyService) { }

  createPolicy(insurancePolicy: InsurancePolicy) {
    this.isSaving = true;

    insurancePolicy = Object.assign({}, insurancePolicy, { consumer_id: this.consumerId });

    this.policyService.newPolicy(insurancePolicy)
        .subscribe( (data) => {
          this.showNewForm = false;
          this.isSaving = false;
          this.insurancePolicies = [ ...this.insurancePolicies, data.insurance_policy ];
        },
        (error: any) => {
            console.log( 'error updating policy' );
            this.isSaving = false;
            this.showNewForm = false;
    });
  }

  updatePolicy(insurancePolicy: InsurancePolicy) {
    this.isUpdating.emit(true);
    this.policyService.updatePolicy(insurancePolicy)
        .subscribe( (data) => {
          this.insurancePolicies = Object.assign( {}, this.insurancePolicies, data.policies);
          this.isUpdating.emit(false);
          this.isEditing.emit(false);
        },
        (error: any) => {
          console.log( 'error updating policy' );
          this.isEditing.emit(false);
          this.isUpdating.emit(false);
      });
  }

  resetUpdatePolicyForm() {
    this.policyService.getPolicies(this.consumerId)
        .subscribe( (data) => {
            this.insurancePolicies = Object.assign({}, this.insurancePolicies, data.policies);
        });
    this.isEditing.emit(false);
  }

  showForm() {
    this.showNewForm = true;
  }

  submitForm() {
      this.newPolicyChild.onSubmit();
  }

  resetForm() {
    this.newPolicyChild.newPolicyForm.reset();
    this.showNewForm = false;
  }

  onEdit(isEditing) {
    this.isEditing.emit(true);
  }
}
