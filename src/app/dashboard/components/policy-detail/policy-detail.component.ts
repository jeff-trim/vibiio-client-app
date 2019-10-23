import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import {
  Form,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";

// Models
import { InsurancePolicy } from "../../models/insurance-policy.interface";
import { InsuranceStatusService } from "../../services/insurance-status.service";

@Component({
  selector: "vib-policy-detail",
  templateUrl: "policy-detail.component.html",
  styleUrls: ["policy-detail.component.scss"]
})
export class PolicyDetailComponent implements OnInit {
  editForm: FormGroup;
  alive: boolean;

  @Input() policy?: InsurancePolicy;
  @Input() onEdit: boolean;

  @Output() formChanged = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private insuranceStatusService: InsuranceStatusService
  ) {}

  ngOnInit() {
    if (this.policy) {
      this.editForm = this.fb.group({
        carrier: [this.policy.carrier, Validators.required],
        policy_number: [this.policy.policy_number, Validators.required],
        consumer_id: [this.policy.consumer_id, Validators.required],
        id: [this.policy.id, Validators.required]
      });
    }

    this.editForm.valueChanges.subscribe((data: any) => {
      this.formChanged.emit(true);
    });
  }

  resetForm() {
    this.editForm.patchValue(this.policy);
  }

  checkErrors(field: AbstractControl): boolean {
    return field.invalid;
  }
}
