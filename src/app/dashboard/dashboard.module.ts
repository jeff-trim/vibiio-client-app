import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http'

// Containers
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { MyVibiiosComponent } from './containers/my-vibiios/my-vibiios.component';

// Components
import { SidebarScheduleComponent } from './components/sidebar-schedule/sidebar-schedule.component';
import { SidebarCustomerComponent } from './components/sidebar-customer/sidebar-customer.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';


// Services
import { DashboardResolver } from './services/dashboard.resolver.service';
import { DashboardService } from './services/dashboard.service';
import { VideoChatTokenService } from './services/video-chat-token.service';
import { MyAppointmentsService } from './services/my-appointments.service';
import { CustomerStatusService } from './services/customer-status.service';
import { SidebarScheduleResolver } from './services/sidebar-schedule.resolver.service';
import { SidebarCustomerResolver } from './services/sidebar-customer.resolver.service';
import { CustomerProfileService } from './services/customer-profile.service';
import { TodaysVibiiosService } from './services/todays-vibiios.service';

// Routes
const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: { vibiio: DashboardResolver,
               sidebarSchedule: SidebarScheduleResolver,
               sidebarCustomerStatuses: SidebarCustomerResolver }
  },
  {
    path: 'my-vibiios',
    component: MyVibiiosComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    SidebarScheduleComponent,
    SidebarCustomerComponent,
    CustomerProfileComponent,
    MyVibiiosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    HttpModule
  ],
  exports: [
    DashboardComponent,
    SidebarComponent,
    MyVibiiosComponent
  ],
  providers: [
    DashboardResolver,
    DashboardService,
    VideoChatTokenService,
    MyAppointmentsService,
    CustomerStatusService,
    SidebarScheduleResolver,
    SidebarCustomerResolver,
    CustomerProfileService,
    TodaysVibiiosService
  ]
})

export class DashboardModule { };
