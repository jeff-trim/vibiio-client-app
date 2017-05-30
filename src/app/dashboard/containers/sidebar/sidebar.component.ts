import { Component } from '@angular/core';
import { SidebarScheduleComponent } from '../../components/sidebar-schedule/sidebar-schedule.component';
import { SidebarCustomerComponent } from '../../components/sidebar-customer/sidebar-customer.component';

// Services
import { MyAppointmentsService } from '../../services/my-appointments.service';
import { CustomerStatusService } from '../../services/customer-status.service';

// Interfaces
import { CustomerStatusCount } from '../../models/customer-status-count.interface';
import { Appointment} from '../../models/appointment.interface';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent {
  appointments: Appointment[];
  customersCategories: CustomerStatusCount[];
  scheduledVibiiosVisibility: boolean = false;
  customerCategoryVisibility: boolean = true;
  profileVisibility: boolean = true;

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

  toggleScheduledVibiios(event){
    this.scheduledVibiiosVisibility = !this.scheduledVibiiosVisibility
    if(!this.scheduledVibiiosVisibility){
      this.customerCategoryVisibility = true
      this.profileVisibility = true
    }
  }

  toggleCustomerCategoryVisibility(event){
    this.customerCategoryVisibility = !this.customerCategoryVisibility
    if(!this.customerCategoryVisibility){
      this.scheduledVibiiosVisibility = true
      this.profileVisibility = true
    }
  }

  toggleProfileVisibility(event){
    this.profileVisibility = !this.profileVisibility
    if(!this.profileVisibility){
      this.scheduledVibiiosVisibility = true
      this.customerCategoryVisibility = true
    }
  }
}
