import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { FormSetup } from '../../dynamic-form/models/config.interface';
import { ConsumerSignUp } from '../models/consumer-sign-up.interface';

// Services
import { SpinnerService } from '../../easy-spinner/services/spinner.service';

@Component({
  selector: 'vib-consumer-sign-up',
  templateUrl: 'consumer-sign-up.component.html'
})

export class ConsumerSignUpComponent {
  constructor(private router: Router,
              private spinnerService: SpinnerService) {}
}

