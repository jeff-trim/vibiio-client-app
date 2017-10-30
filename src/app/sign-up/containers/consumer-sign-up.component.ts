import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Models
import { Config, FormSetup } from '../../dynamic-form/models/config.interface';
import { ConsumerSignUp } from '../models/consumer-sign-up.interface';

// Services
import { SpinnerService } from '../../easy-spinner/services/spinner.service';
import { ConsumerSignUpService } from '../services/consumer-sign-up.service';
import { consumerSignUp } from '../services/form-config';
import { RetrieveInsuranceService } from '../services/retrieve-insurance.service';

@Component({
  selector: 'vib-consumer-sign-up',
  styleUrls: ['consumer-sign-up.component.scss'],
  template: `
  <div class="holder">
    <div class="logo"></div>
    <h1>Consumer Sign Up</h1>
    <vib-dynamic-form [config]="form?.inputs"
                      (submitted)="submitForm($event)"></vib-dynamic-form>
  </div>
  `
})

export class ConsumerSignUpComponent implements OnInit {
  form: FormSetup;
  providers: String[];
  confirmed = false;
  badRequest = false;

  constructor(private router: ActivatedRoute,
              private spinner: SpinnerService,
              private consumerSignUpService: ConsumerSignUpService,
              private retrieveInsuranceService: RetrieveInsuranceService) {}

  ngOnInit() {
    // this.form = consumerSignUp;
    this.router.data.subscribe( (data: { providers: String[] }) => {
      console.log(data);
        // map over array to create a label and a value for each item
        // might have to wrap it in a promise, to make sure that they waited
        // might want to move this to a service. Wrap that function/service in a promise
        // I'm interested in the resolve. True when the index is the last index of the array.
        // Assign new array to the carrier field
    });
  }

  submitForm(event) {
    console.log('Here is the submitted event!', event);

    this.spinner.show();
    this.consumerSignUpService.registerConsumer(event)
        .subscribe( (data) => {
          this.spinner.hide();
          this.confirmed = true;
        },
        (error: any) => {
          this.spinner.hide();
          this.badRequest = true;
        });
  }
}
