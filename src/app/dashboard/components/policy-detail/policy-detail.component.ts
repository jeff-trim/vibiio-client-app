import { Component, OnInit, Input } from '@angular/core';

// Models
import { InsurancePolicy } from '../../models/insurance-policy.interface';

@Component({
    selector: 'vib-policy-detail-form',
    templateUrl: 'policy-detail.component.html',
    styleUrls: ['policy-detail.component.scss']
})

export class PolicyDetailComponent implements OnInit {
   @Input()
   policy: InsurancePolicy;

   submitted = false;

   onSubmit() {
       this.submitted = true;
   }

   // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.policy); }

    constructor() { }

    ngOnInit() {
        console.log(this.policy.carrier);
     }
}
