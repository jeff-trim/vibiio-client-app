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
      </div>
        <div class="title-row"
            (click)='toggleScheduledVibiios($event)'>
          <div class="title">
            My Scheduled vibiios
          </div>
          <div class="arrow"
              [class.left-arrow]='scheduledVibiiosVisibility'
              [class.active-arrow]='!scheduledVibiiosVisibility'>
          </div>
        </div>
        <app-sidebar-schedule
          *ngFor="let appointment of appointments;"
          [appointment] = appointment
          [hidden]='scheduledVibiiosVisibility'>
        </app-sidebar-schedule>
        <div class="title-row"
             (click)='toggleCustomerCategoryVisibility($event)'>
          <div class="title">
            All Customers
          </div>
          <div class="arrow"
              [class.left-arrow]='customerCategoryVisibility'
              [class.active-arrow]='!customerCategoryVisibility'>
          </div>
        </div>
        <app-sidebar-customer
          *ngFor="let customersCategory of customersCategories;"
          [category] = customersCategory
          [hidden] ='customerCategoryVisibility'>
        </app-sidebar-customer>
        <div class="title-row"
             (click)='toggleProfileVisibility($event)'>
          <div class="title">
            My Profile
          </div>
          <div class='arrow'
               [class.left-arrow]='profileVisibility'
               [class.active-arrow]='!profileVisibility'>
          </div>
        </div>
      </div>
    `
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
