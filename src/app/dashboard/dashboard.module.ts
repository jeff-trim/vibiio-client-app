import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http'
import { JcfModule } from '../../../node_modules/angular2-jcf-directive/jcfModule/jcf.module';
import { MomentModule } from 'angular2-moment';
import { NouisliderModule } from 'ng2-nouislider';

// Containers
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MyProfileComponent } from './containers/my-profile/my-profile.component';
import { MyVibiiosComponent } from './containers/my-vibiios/my-vibiios.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';

// Components
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { KeyValueComponent } from './components/key-value/key-value.component';
import { ProfileLicensureComponent } from './components/profile-licensure/profile-licensure.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { SidebarCustomerComponent } from './components/sidebar-customer/sidebar-customer.component';
import { SidebarScheduleComponent } from './components/sidebar-schedule/sidebar-schedule.component';

// Services
import { CustomerProfileService } from './services/customer-profile.service';
import { CustomerStatusService } from './services/customer-status.service';
import { DashboardService } from './services/dashboard.service';
import { MyAppointmentsService } from './services/my-appointments.service';
import { MyProfileService } from './services/my-profile.service';
import { MyDayService } from './services/my-day.service'
import { TodaysVibiiosService } from './services/todays-vibiios.service';
import { VideoChatTokenService } from './services/video-chat-token.service';

// resolvers
import { DashboardResolver } from './services/dashboard.resolver.service'
import { MyAppointmentsResolver } from './services/my-appointments.resolver.service'
import { MyDayResolver } from './services/my-day.resolver.service'
import { MyProfileResolver } from './services/my-profile.resolver.service'
import { SidebarCustomerResolver } from './services/sidebar-customer.resolver.service'

// Routes
const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: { vibiio: DashboardResolver,
               sidebarCustomerStatuses: SidebarCustomerResolver,
               sidebarMyDay: MyDayResolver
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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
      HttpModule,
      JcfModule,
      NouisliderModule,
      MomentModule
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
    MyProfileService,
    MyDayService,
    MyDayResolver
  ]
})

export class DashboardModule { };
