import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './login/containers/login.component';
import { ConsumerSignUpComponent } from './sign-up/containers/consumer-sign-up.component';

// Guards
import { LoggedOutGuardService } from './services/guards/logged-out-guard.service';

const appRoutes: Routes = [
    { path: 'sign-up', component: ConsumerSignUpComponent },
    { path: 'sign_in', component: LoginComponent, canActivate: [LoggedOutGuardService]},
    { path: '', redirectTo: '/dashboard/my-vibiios', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard/my-vibiios', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LoggedOutGuardService
  ]
})
export class AppRoutingModule { }
