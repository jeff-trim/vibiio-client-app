import { Component } from '@angular/core'
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router'
import { SidebarScheduleComponent } from '../../components/sidebar-schedule/sidebar-schedule.component'
import { SidebarCustomerComponent } from '../../components/sidebar-customer/sidebar-customer.component'

// Services
import { MyAppointmentsService } from '../../services/my-appointments.service'
import { CustomerStatusService } from '../../services/customer-status.service'
import { SidebarMyVibiioSharedService } from '../../services/sidebar-my-vibiio-shared.service'

// Interfaces
import { CustomerStatusCount } from '../../models/customer-status-count.interface'
import { Appointment} from '../../models/appointment.interface'

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent {
  myScheduledVibiios: any
  customersCategories: CustomerStatusCount[]
  scheduledVibiiosVisibility: boolean = false
  customerCategoryVisibility: boolean = true
  profileVisibility: boolean = true
  sidebarVisibility: boolean

    constructor(private appointmentsService: MyAppointmentsService,
                private statusService: CustomerStatusService,
                private activatedRoute: ActivatedRoute,
                private sidebarMyVibiioSharedService: SidebarMyVibiioSharedService) {

        // subscribes to shared service and listens for changes passed from the
        // my vibiio container
        sidebarMyVibiioSharedService.changeEmitted$.subscribe(
            response => this.myScheduledVibiios = response.my_day
        )
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) =>{
            this.myScheduledVibiios = data.sidebarMyDay.my_day
        })

    this.statusService
      .getCustomerStatus()
      .subscribe((data: CustomerStatusCount[]) => this.customersCategories = data);
  }

    toggleSidebar(){
        this.sidebarVisibility = !this.sidebarVisibility
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
