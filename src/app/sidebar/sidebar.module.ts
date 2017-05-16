import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http'

// Containers
import { SidebarComponent } from './containers/sidebar.component';

// Components
import { SidebarScheduleComponent } from './components/sidebar-schedule/sidebar-schedule.component';
import { SidebarCustomerComponent } from './components/sidebar-customer/sidebar-customer.component';
import { SidebarProfileComponent } from './components/sidebar-profile/sidebar-profile.component';

//Service
import { MyAppointmentsService } from './services/my-appointments.service';
import { CustomerStatusService } from './services/customer-status.service';
import { MyProfileService } from './services/my-profile.service';

@NgModule({
  declarations: [
    SidebarScheduleComponent,
    SidebarCustomerComponent,
    SidebarProfileComponent
  ],
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [
    SidebarComponent
  ],
  providers: [
    MyAppointmentsService,
    CustomerStatusService,
    MyProfileService
  ]
})

export class SidebarModule {}
