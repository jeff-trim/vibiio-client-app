import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { PasswordResetComponent } from './containers/password-reset.component';

// Components
import { PasswordResetInstructionsComponent } from './components/password-reset-instructions/password-reset-instructions.component';
import { PasswordResetFormComponent } from './components/password-reset-form/password-reset-form.component';

// Routes
const passwordResetRoutes: Routes = [
  {
    path: 'password-reset',
    component: PasswordResetComponent
  }
];

@NgModule({
  declarations: [
    PasswordResetComponent,
    PasswordResetInstructionsComponent,
    PasswordResetFormComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(passwordResetRoutes)
  ],
  exports: [
    PasswordResetComponent
  ],
  providers: []
})

export class PasswordResetModule {}
