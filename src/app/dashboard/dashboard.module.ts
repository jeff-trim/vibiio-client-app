import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http'

// Containers
import { DashboardComponent } from './containers/dashboard.component';
import { SidebarComponent } from './containers/sidebar.component';
import { MyProfileComponent } from './containers/my-profile.component';

// Components
import { SidebarScheduleComponent } from './components/sidebar-schedule/sidebar-schedule.component';
import { SidebarCustomerComponent } from './components/sidebar-customer/sidebar-customer.component';
import { ProfileLicensureComponent } from './components/profile-licensure/profile-licensure.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';

// Services
import { DashboardResolver } from './services/dashboard.resolver.service';
import { DashboardService } from './services/dashboard.service';
import { VideoChatTokenService } from './services/video-chat-token.service';
import { MyAppointmentsService } from './services/my-appointments.service';
import { CustomerStatusService } from './services/customer-status.service';
import { SidebarScheduleResolver } from './services/sidebar-schedule.resolver.service';
import { SidebarCustomerResolver } from './services/sidebar-customer.resolver.service';
import { MyProfileResolver } from './services/my-profile.resolver.service'
import { MyProfileService } from './services/my-profile.service';

// Routes
const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: { vibiio: DashboardResolver,
               sidebarSchedule: SidebarScheduleResolver,
               sidebarCustomerStatuses: SidebarCustomerResolver
             },
      children: [
          { path: 'my_profile',
            component: MyProfileComponent,
            resolve: {
               myProfile: MyProfileResolver
            }
          }
      ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    SidebarScheduleComponent,
    SidebarCustomerComponent,
    MyProfileComponent,
    ProfileInformationComponent,
    ProfileLicensureComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    HttpModule
  ],
  exports: [
    DashboardComponent,
    SidebarComponent
  ],
  providers: [
    DashboardResolver,
    DashboardService,
    VideoChatTokenService,
    MyAppointmentsService,
    CustomerStatusService,
    SidebarScheduleResolver,
    SidebarCustomerResolver,
      MyProfileResolver,
      MyProfileService
  ]
})

export class DashboardModule { };
