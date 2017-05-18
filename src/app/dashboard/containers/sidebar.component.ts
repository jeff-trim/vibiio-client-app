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
    template: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent {
  appointments: Appointment[];
  customersCategories: CustomerStatusCount[];
  scheduledVibiiosVisibility: boolean;
  customerCategoryVisibility: boolean;
  profileVisibility: boolean;

  constructor(private appointmentsService: MyAppointmentsService,
              private statusService: CustomerStatusService) {}

  ngOnInit() {
    this.appointmentsService
      .getMyAppointments()
      .subscribe((data: Appointment[]) => this.appointments = data);

    this.statusService
      .getCustomerStatus()
      .subscribe((data: CustomerStatusCount[]) => this.customersCategories = data);

      this.scheduledVibiiosVisibility = false;
      this.customerCategoryVisibility = true;
      this.profileVisibility =true;
  }

  toggleScheduledVibiios(event){
    this.scheduledVibiiosVisibility = !this.scheduledVibiiosVisibility
    if(!this.customerCategoryVisibility){
      this.customerCategoryVisibility = !this.customerCategoryVisibility
    }
    if(!this.profileVisibility){
      this.profileVisibility = !this.profileVisibility
    }
  }

  toggleCustomerCategoryVisibility(event){
    this.customerCategoryVisibility = !this.customerCategoryVisibility
    if(!this.scheduledVibiiosVisibility){
      this.scheduledVibiiosVisibility = !this.scheduledVibiiosVisibility
    }
    if(!this.profileVisibility){
      this.profileVisibility = !this.profileVisibility
    }
  }

  toggleProfileVisibility(event){
    this.profileVisibility = !this.profileVisibility
    if(!this.scheduledVibiiosVisibility){
      this.scheduledVibiiosVisibility = !this.scheduledVibiiosVisibility
    }
    if(!this.customerCategoryVisibility){
      this.customerCategoryVisibility = !this.customerCategoryVisibility
    }
  }
}
