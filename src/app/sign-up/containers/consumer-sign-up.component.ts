import { Component} from '@angular/core';
import { Router } from '@angular/router';

// Models
import { Config, FormSetup } from '../../dynamic-form/models/config.interface';
import { ConsumerSignUp } from '../models/consumer-sign-up.interface';

// Services
import { SpinnerService } from '../../easy-spinner/services/spinner.service';
import { ConsumerSignUpService } from '../services/consumer-sign-up.service';

// Form Configuration
import { consumerSignUp } from '../services/form-config';

@Component({
  selector: 'vib-consumer-sign-up',
  templateUrl: 'consumer-sign-up.component.html'
})

export class ConsumerSignUpComponent {
  config = consumerSignUp;
  confirmed = false;
  badRequest = false;

  constructor(private router: Router,
              private spinner: SpinnerService,
              private consumerSignUpService: ConsumerSignUpService) {}

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
