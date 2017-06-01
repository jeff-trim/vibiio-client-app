import { Component, Input } from '@angular/core';

@Component({
  selector: 'insurance-policy',
  template: `
<div class="info-element
            row
            between-xs
            bottom-xs" >
  <span class="label">Provider</span>
  <span class="value end-md">{{ policy.carrier }}</span>
  <span class="pink-underline"></span>
</div>

<div class="info-element
            row
            between-xs
            bottom-xs" >
  <span class="label">Provider</span>
  <span class="value end-md">{{ policy.policy_number }}</span>
  <span class="pink-underline"></span>
</div>
`
})

export class InsurancePolicyComponent {
    @Input()
    policy
}
