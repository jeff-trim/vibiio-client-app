import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Modules
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';

// Containers
import { ConsumerSignUpComponent } from './containers/consumer-sign-up.component';

// Components

// Services
import { SpinnerService } from '../easy-spinner/services/spinner.service';

const routes: Routes = [];

@NgModule({
  declarations: [
    ConsumerSignUpComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(routes),
    DynamicFormModule
  ],
  exports: [
  ],
  providers: [
    SpinnerService
  ]
})

export class SignUpModule {}
