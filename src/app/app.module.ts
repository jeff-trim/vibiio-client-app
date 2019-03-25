import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Components
import { AppComponent } from './app.component';

// Services
import { AuthService } from './services/auth.service';
import { RequestOptionsService } from './services/request-options.service';
import { ResponseErrorService } from './services/response-error.service';
import { DateFormatService } from './services/date-format.service';

// libraries
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Custom Modules
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { MomentModule } from 'angular2-moment';
import { NouisliderModule } from 'ng2-nouislider';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { JcfModule } from '../../node_modules/angular2-jcf-directive/jcfModule/jcf.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { SpinnerModule } from './easy-spinner/spinner.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnswerCallModule } from './answer-call/answer-call.module';


import { Injectable } from '@angular/core';

import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://49eb13c9615f44b4972c5b3991fb43b3@sentry.io/1423277'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() { }
  handleError(error) {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    // Angular Modules
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,

    // Custom Modules
    DashboardModule,
    InfiniteScrollModule,
    JcfModule,
    LoginModule,
    MomentModule,
    NouisliderModule,
    PasswordResetModule,
    DynamicFormModule,
    SpinnerModule,
    SignUpModule,
    SharedModule,
    AnswerCallModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    DateFormatService,
    { provide: RequestOptions, useClass: RequestOptionsService },
    { provide: Http, useClass: ResponseErrorService },
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
  }
}
