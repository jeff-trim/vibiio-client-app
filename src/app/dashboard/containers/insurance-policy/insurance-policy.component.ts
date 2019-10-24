import {
  Component,
  Input,
  ViewChildren,
  QueryList,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from "@angular/core";

import { InsurancePolicyService } from "../../services/insurance-policy.service";
import { InsuranceStatusService } from "../../services/insurance-status.service";

import { PolicyDetailNewComponent } from "../../components/policy-detail-new/policy-detail-new.component";
import { PolicyDetailComponent } from "../../components/policy-detail/policy-detail.component";

import { InsurancePolicy } from "../../models/insurance-policy.interface";

@Component({
  selector: "vib-insurance-policy",
  templateUrl: "./insurance-policy.component.html",
  styleUrls: ["./insurance-policy.component.scss"]
})
export class InsurancePolicyComponent implements OnInit, OnDestroy {
  isSaving: boolean;
  showNewForm = false;
  formValid: boolean;
  onEdit = false;
  alive = true;

  @Input() insurancePolicies?: InsurancePolicy[];
  @Input() consumerId: number;

  @Output() editingPolicy: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild(PolicyDetailNewComponent, { static: false })
  newPolicyChild: PolicyDetailNewComponent;

  @ViewChildren(PolicyDetailComponent)
  updatePolicyChild: QueryList<PolicyDetailComponent>;

  constructor(
    private policyService: InsurancePolicyService,
    private insuranceStatusService: InsuranceStatusService
  ) {}

  ngOnInit() {
    this.insuranceStatusService.onCancel$.subscribe((data: any) => {
      if (data) {
        this.resetUpdateForm();
        this.onEdit = false;
      }
    });
    this.insuranceStatusService.onUpdate$.subscribe((data: any) => {
      if (data) {
        this.updatePolicyChild.forEach(policyInstance => {
          if (policyInstance.editForm.dirty) {
            policyInstance.policy = this.updatePolicy(
              policyInstance.editForm.value
            );
          }
        });
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe
    this.alive = false;
  }

  createPolicy(insurancePolicy: InsurancePolicy) {
    this.isSaving = true;

    insurancePolicy = Object.assign({}, insurancePolicy, {
      consumer_id: this.consumerId
    });

    this.policyService.newPolicy(insurancePolicy).subscribe(
      (data: any) => {
        this.showNewForm = false;
        this.isSaving = false;
        this.insurancePolicies = [
          ...this.insurancePolicies,
          data.insurance_policy
        ];
      },
      (error: any) => {
        console.log("error updating policy");
        this.isSaving = false;
        this.showNewForm = false;
      }
    );
  }

  editingForm() {
    this.editingPolicy.emit(true);
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

  resetUpdateForm() {
    this.policyService.getPolicies(this.consumerId).subscribe(
      (data: any) => {
        this.insurancePolicies = Object.assign(
          [],
          this.insurancePolicies,
          data.insurance_policies
        );
      },
      error => {
        console.log("error resetting form");
      }
    );
  }

  updatePolicy(formValue: InsurancePolicy): any {
    this.policyService.updatePolicy(formValue).subscribe(
      (data: any) => {
        this.insuranceStatusService.updateStatus(false);
        this.insuranceStatusService.editStatus(false);
        return data.policy;
      },
      (error: any) => {
        console.log("error updating policy");
        this.insuranceStatusService.editStatus(false);
        this.insuranceStatusService.updateStatus(false);
      }
    );
  }
}
