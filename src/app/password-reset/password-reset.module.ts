import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { PasswordResetComponent } from './containers/password-reset.component';

// Routes
const passwordResetRoutes: Routes = [
  {
    path: 'password-reset',
    component: PasswordResetComponent
  }
];

@NgModule({
  declarations: [
    PasswordResetComponent
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
