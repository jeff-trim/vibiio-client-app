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
        <app-sidebar-schedule></app-sidebar-schedule>
        <app-sidebar-customer></app-sidebar-customer>
        <p>profile.url</p>
      </div>
    `
})

export class SidebarComponent {}
