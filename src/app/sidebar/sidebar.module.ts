import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

// Containers
import { SidebarComponent } from './containers/sidebar.component';

// Components
import { SidebarScheduleComponent } from './components/sidebar-schedule/sidebar-schedule.component';
import { SidebarCustomerComponent } from './components/sidebar-customer/sidebar-customer.component';
import { SidebarProfileComponent } from './components/sidebar-profile/sidebar-profile.component';

// Routes
const sidebarRoutes: Routes = [
  {
    path: 'sidebar',
    component: SidebarComponent   //do we need a route for this? no?
  }
];

@NgModule({
  declarations: [
    SidebarScheduleComponent,
    SidebarCustomerComponent,
    SidebarProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(sidebarRoutes)
  ],
  exports: [
    SidebarComponent
  ],
  providers: []
})

export class SidebarModule {}
