import { Component, Input, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { InsurancePolicy } from '../../models/insurance-policy.interface';
import { InsurancePolicyService } from '../../services/insurance-policy.service';
import { PolicyDetailNewComponent } from '../../components/policy-detail-new/policy-detail-new.component';
import { PolicyDetailComponent } from '../../components/policy-detail/policy-detail.component';
import { InsuranceStatusService } from '../../services/insurance-status.service';

@Component({
  selector: 'vib-insurance-policy',
  templateUrl: './insurance-policy.component.html',
  styleUrls: ['./insurance-policy.component.scss']
})

export class InsurancePolicyComponent implements OnInit {
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

  constructor(private policyService: InsurancePolicyService,
              private insuranceStatusService: InsuranceStatusService) { }

  ngOnInt() {
    this.insuranceStatusService.onEdit$.subscribe(
        data => {
          this.toggleActionCable(data);
        });
  }

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
    this.insuranceStatusService.updateStatus(true);
    this.policyService.updatePolicy(insurancePolicy)
        .subscribe( (data) => {
          this.insurancePolicies = Object.assign( {}, this.insurancePolicies, data.policies);
          this.insuranceStatusService.updateStatus(false);
          this.insuranceStatusService.editStatus(false);
        },
        (error: any) => {
          console.log( 'error updating policy' );
          this.insuranceStatusService.editStatus(false);
          this.insuranceStatusService.updateStatus(false);
      });
  }

  resetUpdatePolicyForm() {
    this.policyService.getPolicies(this.consumerId)
        .subscribe( (data) => {
            this.insurancePolicies = Object.assign({}, this.insurancePolicies, data.policies);
        });
        this.insuranceStatusService.editStatus(false);
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
    this.insuranceStatusService.editStatus(isEditing);
  }
}
