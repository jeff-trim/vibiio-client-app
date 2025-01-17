import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

// Modules
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';

// Containers
import { ConsumerSignUpComponent } from './containers/consumer-sign-up.component';

// Components

// Services
import { SpinnerService } from '../easy-spinner/services/spinner.service';
import { ConsumerSignUpService } from './services/consumer-sign-up.service';
import { RetrieveInsuranceService } from './services/retrieve-insurance.service';
import { InsuranceResolverService } from './services/insurance-resolver.service';
import { RetrieveLanguageService } from './services/retrieve-language.service';
import { LanguageResolverService } from './services/language-resolver.service';
import { FormSelectMapperService } from './services/form-select-mapper.service';

@NgModule({
  declarations: [
    ConsumerSignUpComponent
  ],
  imports: [
    CommonModule,
    HttpModule,

    DynamicFormModule
  ],
  exports: [
  ],
  providers: [
    ConsumerSignUpService,
    SpinnerService,
    RetrieveInsuranceService,
    InsuranceResolverService,
    RetrieveLanguageService,
    LanguageResolverService,
    FormSelectMapperService
  ]
})

export class SignUpModule {}
