import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http'

// Containers
import { SidebarComponent } from './containers/sidebar.component';

// Components
import { SidebarScheduleComponent } from './components/sidebar-schedule/sidebar-schedule.component';
import { SidebarCustomerComponent } from './components/sidebar-customer/sidebar-customer.component';
import { SidebarProfileComponent } from './components/sidebar-profile/sidebar-profile.component';

//Service
import { MyAppointmentsService } from './services/my-appointments.service';

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
    RouterModule.forChild(sidebarRoutes),
    HttpModule
  ],
  exports: [
    SidebarComponent
  ],
  providers: [
    MyAppointmentsService
  ]
})

export class SidebarModule {}
