import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { DashboardComponent } from './containers/dashboard.component';

// Services
import { DashboardResolver } from './services/dashboard.resolver.service';
import { DashboardService } from './services/dashboard.service';
import { VideoChatTokenService } from './services/video-chat-token.service';
import { SidebarScheduleResolver } from './services/sidebar-schedule.resolver.service';
import { SidebarCustomerResolver } from './services/sidebar-customer.resolver.service';

// Routes
const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: { vibiio: DashboardResolver,
               sidebarSchedule: SidebarScheduleResolver,
               sidebarCustomerStatuses: SidebarCustomerResolver }
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    DashboardResolver,
    DashboardService,
    VideoChatTokenService,
    SidebarScheduleResolver,
    SidebarCustomerResolver
  ]
})

export class DashboardModule { };
