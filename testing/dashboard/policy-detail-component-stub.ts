import { Component, Input } from '@angular/core';
import { InsurancePolicy } from '../../src/app/dashboard/models/insurance-policy.interface';

@Component({
  selector: 'vib-policy-detail',
  template: `
  <div>
  </div>
  `
})

export class MockPolicyDetailComponent {
  @Input()
  policy?: InsurancePolicy;
}
