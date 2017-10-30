import { Component} from '@angular/core';
import { Router } from '@angular/router';

// Models
import { Config, FormSetup } from '../../dynamic-form/models/config.interface';
import { ConsumerSignUp } from '../models/consumer-sign-up.interface';

// Services
import { SpinnerService } from '../../easy-spinner/services/spinner.service';

// Form Configuration
import { consumerSignUp } from '../services/form-config';

@Component({
  selector: 'vib-consumer-sign-up',
  templateUrl: 'consumer-sign-up.component.html'
})

export class ConsumerSignUpComponent {
  config = consumerSignUp;

  constructor(private router: Router,
              private spinnerService: SpinnerService) {}

  submitForm(event) {
    console.log('Here is the submitted event!', event);
  }
}
