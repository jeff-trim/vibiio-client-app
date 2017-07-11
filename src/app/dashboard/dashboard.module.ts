import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { HttpModule } from '@angular/http';
import { JcfModule } from '../../../node_modules/angular2-jcf-directive/jcfModule/jcf.module';
import { MomentModule } from 'angular2-moment';
import { NouisliderModule } from 'ng2-nouislider';

// Containers
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MyProfileComponent } from './containers/my-profile/my-profile.component';
import { MyVibiiosComponent } from './containers/my-vibiios/my-vibiios.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { AppointmentComponent } from './containers/appointment/appointment.component';
import { ConsumerStatusComponent } from './containers/consumer-status/consumer-status.component';

// libraries
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Components
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { ConsumerProfileComponent } from './components/consumer-profile/consumer-profile.component';
import { ConsumerProfileTitleComponent } from './components/consumer-profile-title/consumer-profile-title.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { KeyValueComponent } from './components/key-value/key-value.component';
import { ProfileLicensureComponent } from './components/profile-licensure/profile-licensure.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { SidebarCustomerComponent } from './components/sidebar-customer/sidebar-customer.component';
import { SidebarScheduleComponent } from './components/sidebar-schedule/sidebar-schedule.component';
import { AppointmentNotificationComponent } from './components/appointment-notification/appointment-notification.component'
import { VideoArchiveComponent } from './components/video-archive/video-archive.component';

// Services
import { CustomerProfileService } from './services/customer-profile.service';
import { AppointmentService } from './services/appointment.service';
import { CustomerStatusCountService } from './services/customer-status-count.service';
import { ConsumerStatusService } from './services/consumer-status.service';
import { AllConsumersService } from './services/all-consumers.service';
import { DashboardService } from './services/dashboard.service';
import { MyAppointmentsService } from './services/my-appointments.service';
import { MyProfileService } from './services/my-profile.service';
import { MyDayService } from './services/my-day.service';
import { SidebarMyVibiioSharedService } from './services/sidebar-my-vibiio-shared.service';
import { TodaysVibiiosService } from './services/todays-vibiios.service';
import { VideoChatTokenService } from './services/video-chat-token.service';
import { VideoSnapshotService } from './services/video-snapshot.service';
import { MyAvailabilityService } from './services/my-availability.service';
import { VideoArchiveService } from './services/video-archive.service';


// resolvers
import { DashboardResolver } from './services/dashboard.resolver.service';
import { MyAppointmentsResolver } from './services/my-appointments.resolver.service';
import { MyDayResolver } from './services/my-day.resolver.service';
import { MyProfileResolver } from './services/my-profile.resolver.service';
import { SidebarCustomerResolver } from './services/sidebar-customer.resolver.service';
import { CustomerProfileResolver } from './services/customer-profile.resolver.service';
import { ConsumerStatusResolver } from './services/consumer-status.resolver.service';
import { AllConsumersResolver } from './services/all-consumers.resolver.service';
import { AppointmentResolver } from './services/appointment.resolver.service';
import { MyAvailabilityResolver } from './services/my-availability.resolver.service';
import { VideoArchiveResolver } from './services/video-archive.resolver.service';

// Routes
const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: { sidebarCustomerStatuses: SidebarCustomerResolver,
               sidebarMyDay: MyDayResolver,
               appointments: MyAppointmentsResolver,
               myProfile: MyProfileResolver,
               availability: MyAvailabilityResolver
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
                  sidebarCustomerStatuses: SidebarCustomerResolver,
                  sidebarMyDay: MyDayResolver,
                  myProfile: MyProfileResolver
            }
          },
          {
            path: 'customer-profile',
            component: CustomerProfileComponent,
            resolve: {
                customerProfile: CustomerProfileResolver
            }
          },
          {
            path: 'appointment/:id',
            component: AppointmentComponent,
            resolve: {
               appt: AppointmentResolver
            }
          },
          {
            path: 'consumer-status/:status',
            component: ConsumerStatusComponent,
            resolve: {
               cons: ConsumerStatusResolver
            }
          },
           {
            path: 'all-consumers',
            component: ConsumerStatusComponent,
            resolve: {
               cons: AllConsumersResolver
            }
          },
          // {
          //   path: 'vibiio-profile/:id',
          //   component: VibiioProfileComponent,
          //   resolve: {

          //   }
          // }
      ]
  }
];

@NgModule({
    declarations: [
    DashboardComponent,
    KeyValueComponent,
    SidebarComponent,
    AppointmentDetailsComponent,
    SidebarScheduleComponent,
    SidebarCustomerComponent,
    CustomerProfileComponent,
    ConsumerProfileComponent,
    ConsumerProfileTitleComponent,
    ConsumerStatusComponent,
    AppointmentComponent,
    MyVibiiosComponent,
    MyProfileComponent,
    VideoArchiveComponent,
    ProfileInformationComponent,
        ProfileLicensureComponent,
        AppointmentNotificationComponent
  ],
  imports: [
      CommonModule,
      RouterModule.forChild(dashboardRoutes),
      HttpModule,
      JcfModule,
      NouisliderModule,
      MomentModule,
      InfiniteScrollModule
  ],
  exports: [
    DashboardComponent,
    SidebarComponent,
    MyVibiiosComponent,
    MyProfileComponent,
      AppointmentComponent
  ],
  providers: [
    DashboardResolver,
    DashboardService,
    VideoSnapshotService,
    VideoChatTokenService,
    VideoArchiveService,
    VideoArchiveResolver,
    MyAppointmentsService,
    MyAppointmentsResolver,
    CustomerStatusCountService,
    ConsumerStatusService,
    ConsumerStatusResolver,
    AllConsumersService,
    AllConsumersResolver,
    CustomerProfileResolver,
    AppointmentService,
    AppointmentResolver,
    SidebarCustomerResolver,
    CustomerProfileService,
    TodaysVibiiosService,
    MyProfileResolver,
    MyProfileService,
    MyAvailabilityService,
    MyAvailabilityResolver,
    MyDayService,
    MyDayResolver,
      SidebarMyVibiioSharedService
  ]
})

export class DashboardModule { };
