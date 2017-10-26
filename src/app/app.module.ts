import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Components
import { AppComponent } from './app.component';

// Services
import { AuthService } from './services/auth.service';
import { RequestOptionsService } from './services/request-options.service';
import { ResponseErrorService } from './services/response-error.service';
import { SidebarMyVibiioSharedService } from './dashboard/services/sidebar-my-vibiio-shared.service';
import { DateFormatService } from './services/date-format.service';
import { LocalStoreManagerService } from './services/local-store-manager.service';

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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

      // Angular Modules
      BrowserModule,
      CommonModule,

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
      AppRoutingModule
  ],
  providers: [
      AuthService,
      DateFormatService,
      LocalStoreManagerService,
    { provide: RequestOptions, useClass: RequestOptionsService },
    { provide: Http, useClass: ResponseErrorService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
  }
}
