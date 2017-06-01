import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http'

// Containers
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MyProfileComponent } from './containers/my-profile/my-profile.component';
import { MyVibiiosComponent } from './containers/my-vibiios/my-vibiios.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';

// Components
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { InsurancePolicyComponent } from './components/insurance-policy/insurance-policy.component';
import { KeyValueComponent } from './components/key-value/key-value.component';
import { ProfileLicensureComponent } from './components/profile-licensure/profile-licensure.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { SidebarCustomerComponent } from './components/sidebar-customer/sidebar-customer.component';
import { SidebarScheduleComponent } from './components/sidebar-schedule/sidebar-schedule.component';

// Services
import { CustomerProfileService } from './services/customer-profile.service';
import { CustomerStatusService } from './services/customer-status.service';
import { DashboardResolver } from './services/dashboard.resolver.service';
import { DashboardService } from './services/dashboard.service';
import { MyAppointmentsResolver } from './services/my-appointments.resolver.service';
import { MyAppointmentsService } from './services/my-appointments.service';
import { MyProfileResolver } from './services/my-profile.resolver.service'
import { MyProfileService } from './services/my-profile.service';
import { SidebarCustomerResolver } from './services/sidebar-customer.resolver.service';
import { TodaysVibiiosService } from './services/todays-vibiios.service';
import { VideoChatTokenService } from './services/video-chat-token.service';

// Routes
const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: { vibiio: DashboardResolver,
               // sidebarSchedule: MyAppointmentsResolver,
               sidebarCustomerStatuses: SidebarCustomerResolver
             },
      children: [
          { path: 'my_profile',
            component: MyProfileComponent,
            resolve: {
               myProfile: MyProfileResolver
            }
          },
          {
            path: 'my-vibiios',
            component: MyVibiiosComponent,
              resolve: {
                  appointments: MyAppointmentsResolver,
                  sidebarCustomerStatuses: SidebarCustomerResolver
            }
          }
      ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    KeyValueComponent,
    SidebarComponent,
    SidebarScheduleComponent,
    SidebarCustomerComponent,
    CustomerProfileComponent,
    MyVibiiosComponent,
    MyProfileComponent,
    ProfileInformationComponent,
    ProfileLicensureComponent,
    InsurancePolicyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    HttpModule
  ],
  exports: [
    DashboardComponent,
    SidebarComponent,
    MyVibiiosComponent,
    MyProfileComponent
  ],
  providers: [
    DashboardResolver,
    DashboardService,
    VideoChatTokenService,
    MyAppointmentsService,
      MyAppointmentsResolver,
    CustomerStatusService,
    SidebarCustomerResolver,
    CustomerProfileService,
    TodaysVibiiosService,
    MyProfileResolver,
    MyProfileService
  ]
})

export class DashboardModule { };
