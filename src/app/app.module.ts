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

// Guards
import { LoggedOutGuardService } from './guards/logged-out-guard.service';

// Custom Modules
import { AppRoutingModule } from './app-routing.module';
import { VibiioModule } from './vibiio/vibiio.module';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    CommonModule,

    // Custom Modules
    AppRoutingModule,
    VibiioModule,
    LoginModule
  ],
  providers: [
    AuthService,
    LoggedOutGuardService,
    { provide: RequestOptions, useClass: RequestOptionsService },
    { provide: Http, useClass: ResponseErrorService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
