import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/containers/login.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }
