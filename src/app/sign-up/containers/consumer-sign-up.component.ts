import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jcf from 'jcf';

// Models
import { FormSetup } from '../../dynamic-form/models/config.interface';
import { ConsumerSignUp } from '../models/consumer-sign-up.interface';
import { InsuranceProviderList } from '../../dashboard/models/insurance-provider-list.interface';
import { LanguageList } from '../../dashboard/models/language-list.interface';
import { states } from '../../dashboard/models/states';

// Services
import { SpinnerService } from '../../easy-spinner/services/spinner.service';
import { ConsumerSignUpService } from '../services/consumer-sign-up.service';
import { consumerSignUp } from '../services/form-config';
import { RetrieveInsuranceService } from '../services/retrieve-insurance.service';
import { RetrieveLanguageService } from '../services/retrieve-language.service';
import { FormSelectMapperService } from '../services/form-select-mapper.service';

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
      </div>
    </div>
  `
})

export class ConsumerSignUpComponent implements OnInit, AfterViewChecked {
  form: FormSetup = consumerSignUp;
  states: string[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private spinner: SpinnerService,
              private consumerSignUpService: ConsumerSignUpService,
              private retrieveInsuranceService: RetrieveInsuranceService,
              private retrieveLanguageService: RetrieveLanguageService,
              private formSelectMapperService: FormSelectMapperService) {
    this.states = states;
  }

  ngOnInit() {
    this.route.data.subscribe( (data: { providers: InsuranceProviderList, languages: LanguageList}) => {
      this.formSelectMapperService.mapValues(data.providers.insurance_providers).then( (mapped_providers) => {
        this.form.inputs[10] = Object.assign({}, this.form.inputs[10], { options: mapped_providers });
      });

      this.formSelectMapperService.mapValues(data.languages.languages).then( (mapped_languages) => {
        this.form.inputs[9] = Object.assign({}, this.form.inputs[9], { options: mapped_languages });
      });
    });

    this.formSelectMapperService.mapValues(this.states).then( (mapped_states) => {
      this.form.inputs[7] = Object.assign({}, this.form.inputs[7], { options: mapped_states });
    });
  }

  ngAfterViewChecked() {
    jcf.replaceAll();
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
