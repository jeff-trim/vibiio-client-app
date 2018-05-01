import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { HttpModule } from '@angular/http';
import { JcfModule } from '../../../node_modules/angular2-jcf-directive/jcfModule/jcf.module';
import { MomentModule } from 'angular2-moment';
import { NouisliderModule } from 'ng2-nouislider';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Custom Modules
import { SharedModule } from '../shared/shared.module';

// Containers
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MyProfileComponent } from './containers/my-profile/my-profile.component';
import { MyVibiiosComponent } from './containers/my-vibiios/my-vibiios.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { AppointmentComponent } from './containers/appointment/appointment.component';
import { ConsumerStatusComponent } from './containers/consumer-status/consumer-status.component';
import { NotesComponent } from './containers/notes/notes.component';
import { VibiioProfileComponent } from './containers/vibiio-profile/vibiio-profile.component';

// libraries
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Components
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { ConsumerProfileComponent } from './components/consumer-profile/consumer-profile.component';
import { ConsumerProfileTitleComponent } from './components/consumer-profile-title/consumer-profile-title.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { KeyValueComponent } from './components/key-value/key-value.component';
import { ProfileLicensureComponent } from './components/profile-licensure/profile-licensure.component';
import { ProfileNewLicensureComponent } from './components/profile-licensure/profile-new-licensure.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { SidebarCustomerComponent } from './components/sidebar-customer/sidebar-customer.component';
import { SidebarScheduleComponent } from './components/sidebar-schedule/sidebar-schedule.component';
import { AppointmentNotificationComponent } from './components/appointment-notification/appointment-notification.component';
import { NewNoteComponent } from './components/note/new-note.component';
import { ExistingNoteComponent } from './components/note/existing-note.component';
import { PolicyDetailComponent } from './components/policy-detail/policy-detail.component';
import { VideoArchiveComponent } from './components/video-archive/video-archive.component';
import { InsurancePolicyComponent } from './containers/insurance-policy/insurance-policy.component';
import { SortButtonComponent } from './components/sort-button/sort-button.component';
import { PolicyDetailNewComponent } from './components/policy-detail-new/policy-detail-new.component';
import { ConsumerAddressComponent } from './components/consumer-address/consumer-address.component';
import { ConsumerProfileSummaryComponent } from './components/consumer-profile-summary/consumer-profile-summary.component';
import { InsurancePolicySummaryComponent } from './components/insurance-policy-summary/insurance-policy-summary.component';
import { VibiioSearchComponent } from './components/vibiio-search/vibiio-search.component';
import { VibiioDescriptionComponent } from './components/vibiio-description/vibiio-description.component';
import { CustomerNoteComponent } from './components/customer-note/customer-note.component';

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
import { MyAvailabilityService } from './services/my-availability.service';
import { NoteService } from './services/note.service';
import { InsurancePolicyService } from './services/insurance-policy.service';
import { VideoArchiveService } from './services/video-archive.service';
import { VibiioProfileService } from './services/vibiio-profile.service';
import { MyLicenseService } from './services/my-license.service';
import { ConsumerSortService } from './services/consumer-sort.service';
import { AddressStatusService } from './services/address-status.service';
import { AppointmentDetailsFormStatusService } from './services/appointment-details-form-status.service';
import { ConsumerUpdateService } from './services/consumer-update.service';
import { VibiioProfileFormStatusService } from './services/vibiio-profile-form-status.service';
import { InsuranceStatusService } from './services/insurance-status.service';

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
import { VibiioProfileResolver } from './services/vibiio-profile.resolver.service';

// Directives
import { AutosizeDirective } from './directives/autosize.directive';
import { VibiiographerCallComponent } from '../shared/components/vibiiographer-call/vibiiographer-call.component';

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
          {path: 'appointment/:id', component: AppointmentComponent,
            resolve: {
               appt: AppointmentResolver
            }
          },
          {
            path: 'consumer-status/:status',
            component: ConsumerStatusComponent,
            resolve: {
              data: AllConsumersResolver
            }
          },
           {
            path: 'all-consumers/:status',
            component: ConsumerStatusComponent,
            resolve: {
               data: AllConsumersResolver
            }
          },
          {
            path: 'vibiio-profile/:id',
            component: VibiioProfileComponent,
            resolve: {
              profile: VibiioProfileResolver,
               cons: AllConsumersResolver
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
    AppointmentDetailsComponent,
    SidebarScheduleComponent,
    SidebarCustomerComponent,
    CustomerProfileComponent,
    ConsumerProfileComponent,
    ConsumerProfileTitleComponent,
    ConsumerStatusComponent,
    VibiioProfileComponent,
    AppointmentComponent,
    MyVibiiosComponent,
    MyProfileComponent,
    VideoArchiveComponent,
    ProfileInformationComponent,
    ProfileLicensureComponent,
    ProfileNewLicensureComponent,
    AppointmentNotificationComponent,
    NotesComponent,
    NewNoteComponent,
    ExistingNoteComponent,
    PolicyDetailComponent,
    AutosizeDirective,
    PolicyDetailNewComponent,
    InsurancePolicyComponent,
    SortButtonComponent,
    ConsumerAddressComponent,
    ConsumerProfileSummaryComponent,
    InsurancePolicySummaryComponent,
    VibiioSearchComponent,
    VibiioDescriptionComponent,
    CustomerNoteComponent
  ],
  imports: [
      CommonModule,
      HttpModule,
      JcfModule,
      NouisliderModule,
      MomentModule,
      InfiniteScrollModule,
      DynamicFormModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      RouterModule.forChild(dashboardRoutes),
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
    SidebarMyVibiioSharedService,
    NoteService,
    InsurancePolicyService,
    VibiioProfileService,
    VibiioProfileResolver,
    SidebarMyVibiioSharedService,
    MyLicenseService,
    ConsumerSortService,
    InsuranceStatusService,
    AddressStatusService,
    ConsumerUpdateService,
    AppointmentDetailsFormStatusService,
    VibiioProfileFormStatusService
  ],
  entryComponents: [
    VibiiographerCallComponent
  ]
})

export class DashboardModule { }
