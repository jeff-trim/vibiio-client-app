import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

// Components
import { AppComponent } from "./app.component";

// Services
import { AuthService } from "./services/auth.service";
import { DateFormatService } from "./services/date-format.service";
import { ResponseInterceptor } from "./services/interceptors/response.interceptor";
import { AuthInterceptor } from "./services/interceptors/auth-request.interceptor";

// libraries
import { JcfModule } from "../../node_modules/angular2-jcf-directive/jcfModule";
import { MomentModule } from "ngx-moment";
import { NouisliderModule } from "ng2-nouislider";

// Custom Modules
import { AppRoutingModule } from "./app-routing.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { LoginModule } from "./login/login.module";
import { PasswordResetModule } from "./password-reset/password-reset.module";
import { DynamicFormModule } from "./dynamic-form/dynamic-form.module";
import { SpinnerModule } from "./easy-spinner/spinner.module";
import { SignUpModule } from "./sign-up/sign-up.module";
import { SharedModule } from "./shared/shared.module";
import { AnswerCallModule } from "./answer-call/answer-call.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular Modules
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,

    // Custom Modules
    DashboardModule,
    HttpClientModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {}
}
