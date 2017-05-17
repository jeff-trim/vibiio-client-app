import { Component } from '@angular/core';
import { SidebarScheduleComponent } from '../components/sidebar-schedule/sidebar-schedule.component';
import { SidebarCustomerComponent } from '../components/sidebar-customer/sidebar-customer.component';

// Services
import { MyAppointmentsService } from '../services/my-appointments.service';
import { CustomerStatusService } from '../services/customer-status.service';

// Interfaces
import { CustomerStatusCount } from '../models/customer-status-count.interface';
import { Appointment} from '../models/appointment.interface';

@Component({
    selector: 'app-sidebar',
    styleUrls: ['sidebar.component.scss'],
    template: `
      <div class='sidebar'>
      <div class="logo-container">
      <div>
        <div class="title">
          My Scheduled Vibbiios
        </div>
        <app-sidebar-schedule
          *ngFor="let appointment of appointments;"
          [appointment] = appointment>
        </app-sidebar-schedule>
        <div class="title">
          All Customers
        </div>
        <app-sidebar-customer
          *ngFor="let customersCategory of customersCategories;"
          [category] = customersCategory>
        </app-sidebar-customer>
        <div class="title">
          My Profile
        </div>
      </div>
    `
})

export class SidebarComponent {
  appointments: Appointment[];
  customersCategories: CustomerStatusCount[];

  constructor(private appointmentsService: MyAppointmentsService,
              private statusService: CustomerStatusService) {}

  ngOnInit() {
    this.appointmentsService
      .getMyAppointments()
      .subscribe((data: Appointment[]) => this.appointments = data);

    this.statusService
      .getCustomerStatus()
      .subscribe((data: CustomerStatusCount[]) => this.customersCategories = data);
  }
}
