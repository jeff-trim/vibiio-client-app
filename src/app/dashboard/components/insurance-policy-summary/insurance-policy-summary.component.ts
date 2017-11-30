import { Component, Input } from '@angular/core';
import { InsurancePolicy } from '../../models/insurance-policy.interface';

@Component({
  selector: 'vib-insurance-policy-summary',
  templateUrl: './insurance-policy-summary.component.html',
  styleUrls: ['./insurance-policy-summary.component.scss']
})

export class InsurancePolicySummaryComponent {
  @Input() policies?: InsurancePolicy[];
}
