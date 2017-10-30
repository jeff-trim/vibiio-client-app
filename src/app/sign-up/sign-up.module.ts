import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Modules

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
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
  ],
  providers: [
    SpinnerService
  ]
})

export class SignUpModule {}
