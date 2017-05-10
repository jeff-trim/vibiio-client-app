import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './login/containers/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/vibiios', pathMatch: 'full' },
  { path: 'sign_in', component: LoginComponent }
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
