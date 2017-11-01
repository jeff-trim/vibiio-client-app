import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Models
import { FormSetup } from '../../dynamic-form/models/config.interface';
import { ConsumerSignUp } from '../models/consumer-sign-up.interface';

// Services
import { SpinnerService } from '../../easy-spinner/services/spinner.service';
import { ConsumerSignUpService } from '../services/consumer-sign-up.service';
import { consumerSignUp } from '../services/form-config';
import { RetrieveInsuranceService } from '../services/retrieve-insurance.service';
import { MapProvidersService } from '../services/map-providers.service';

@Component({
  selector: 'vib-consumer-sign-up',
  styleUrls: ['consumer-sign-up.component.scss'],
  template: `
  <div class="holder">
    <div class="logo"></div>
    <h1>Consumer Sign Up</h1>
    <vib-dynamic-form id="sign-up-form"
                      [config]="form?.inputs"
                      (submitted)="submitForm($event)"></vib-dynamic-form>
  </div>
  `
})

export class ConsumerSignUpComponent implements OnInit {
  form: FormSetup = consumerSignUp;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private spinner: SpinnerService,
              private consumerSignUpService: ConsumerSignUpService,
              private retrieveInsuranceService: RetrieveInsuranceService,
              private mapProvidersService: MapProvidersService) {}

  ngOnInit() {
    this.route.data.subscribe( (data: { providers: any }) => {
      this.mapProvidersService.mapProviders(data.providers.insurance_providers).then( (mapped_data) => {
        this.form.inputs[9].options = mapped_data;
      });
    });
  }

  submitForm(event) {
    this.spinner.show();
    this.consumerSignUpService.registerConsumer(event)
        .subscribe( (data) => {
          this.spinner.hide();
          this.router.navigate(['sign_in']);
        },
        (error: any) => {
          this.spinner.hide();
        });
  }
}
