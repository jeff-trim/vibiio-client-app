import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './login/containers/login.component';
import { ConsumerSignUpComponent } from './sign-up/containers/consumer-sign-up.component';

// Guards & Resolvers
import { LoggedOutGuardService } from './services/guards/logged-out-guard.service';
import { InsuranceResolverService } from './sign-up/services/insurance-resolver.service';
import { LanguageResolverService } from './sign-up/services/language-resolver.service';
import { InsurancePolicyService } from './dashboard/services/insurance-policy.service';
import { AnswerCallComponent } from './answer-call/answer-call.component';
import { AnswerCallResolverService } from './answer-call/services/answer-call-resolver.service';

const appRoutes: Routes = [
    { path: 'sign_up', component: ConsumerSignUpComponent, resolve: {
        providers: InsuranceResolverService,
        languages: LanguageResolverService
       }
    },
    { path: 'sign_in', component: LoginComponent, canActivate: [LoggedOutGuardService]},
    { path: 'call/:token/:userId',
      component: AnswerCallComponent,
      resolve: {
        callData: AnswerCallResolverService
      }
    },
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
