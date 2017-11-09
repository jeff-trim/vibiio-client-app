import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jcf from 'jcf';
// Models
import { FormSetup } from '../../dynamic-form/models/config.interface';
import { ConsumerSignUp } from '../models/consumer-sign-up.interface';

// Services
import { SpinnerService } from '../../easy-spinner/services/spinner.service';
import { ConsumerSignUpService } from '../services/consumer-sign-up.service';
import { consumerSignUp } from '../services/form-config';
import { RetrieveInsuranceService } from '../services/retrieve-insurance.service';
import { MapProvidersService } from '../services/map-providers.service';
import { RetrieveLanguageService } from '../services/retrieve-language.service';
import { MapLanguagesService } from '../services/map-langauages.service';

@Component({
  selector: 'vib-consumer-sign-up',
  styleUrls: ['consumer-sign-up.component.scss'],
  template: `
  <div class="holder">
    <div class="col-xs-12">
      <div class="logo"></div>
      <h1>Consumer Sign Up</h1>
      <vib-dynamic-form id="sign-up-form"
                        [config]="form?.inputs"
                        (submitted)="submitForm($event)"></vib-dynamic-form>
    <div>
  </div>
  `
})

export class ConsumerSignUpComponent implements OnInit, AfterViewChecked {
  form: FormSetup = consumerSignUp;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private spinner: SpinnerService,
              private consumerSignUpService: ConsumerSignUpService,
              private retrieveInsuranceService: RetrieveInsuranceService,
              private mapProvidersService: MapProvidersService,
              private retrieveLanguageService: RetrieveLanguageService,
              private mapLanguagesService: MapLanguagesService) {}

  ngOnInit() {
    this.route.data.subscribe( (data: { providers: any, languages: any}) => {
      this.mapProvidersService.mapProviders(data.providers.insurance_providers).then( (mapped_providers) => {
        this.form.inputs[10] = Object.assign({}, this.form.inputs[10], { options: mapped_providers });
      });
      this.mapLanguagesService.mapLanguages(data.languages.languages).then( (mapped_languages) => {
        this.form.inputs[9] = Object.assign({}, this.form.inputs[9], { options: mapped_languages });
      });
    });
  }

  ngAfterViewChecked() {
    jcf.refreshAll();
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
