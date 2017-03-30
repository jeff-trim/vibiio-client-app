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

// Custom Modules
import { LoginModule } from './login/login.module';

// Routes
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    CommonModule,

    // Custom Modules
    LoginModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
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
