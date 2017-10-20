import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { SidebarScheduleComponent } from '../../components/sidebar-schedule/sidebar-schedule.component';
import { SidebarCustomerComponent } from '../../components/sidebar-customer/sidebar-customer.component';

// Services
import { MyAppointmentsService } from '../../services/my-appointments.service';
import { CustomerStatusCountService } from '../../services/customer-status-count.service';
import { SidebarMyVibiioSharedService } from '../../services/sidebar-my-vibiio-shared.service';
import { MyAvailabilityService } from '../../services/my-availability.service';
import { VibiioUpdatesToSidebarService } from '../../services/vibiio-updates-to-sidebar.service';
import { AuthService } from '../../../services/auth.service';

// Interfaces
import { CustomerStatusCount } from '../../models/customer-status-count.interface';
import { Appointment} from '../../models/appointment.interface';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  myScheduledVibiios: any;
  customersCategories: CustomerStatusCount[];
  scheduledVibiiosVisibility = false;
  customerCategoryVisibility = true;
  profileVisibility = true;
  sidebarVisibility: boolean;
  userTimeZone: string;

  @Output()
  emitAvailability: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  available: boolean;

    constructor(private appointmentsService: MyAppointmentsService,
                private statusService: CustomerStatusCountService,
                private activatedRoute: ActivatedRoute,
                private availabilityService: MyAvailabilityService,
                private sidebarMyVibiioSharedService: SidebarMyVibiioSharedService,
                private vibiioUpdatesToSidebarService: VibiioUpdatesToSidebarService,
                private authService: AuthService,
                private router: Router) {

        // subscribes to shared service and listens for changes passed from the
        // my vibiio container
        sidebarMyVibiioSharedService.changeEmitted$.subscribe(
            response => (this.myScheduledVibiios = response.my_day)
        );
        // subscribes to shared service and listens for changes passed from the
        // my vibiio container
        this.vibiioUpdatesToSidebarService.changeEmitted$.subscribe(
            response => (this.getStatusUpdate())
        );
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.userTimeZone = data.appointments.appointments.user_time_zone;
            this.myScheduledVibiios = data.sidebarMyDay.my_day;
        });

        this.getStatusUpdate();
  }

    getStatusUpdate() {
      this.statusService
      .getCustomerStatus()
      .subscribe((data: CustomerStatusCount[]) => this.customersCategories = data);
    }

    toggleAvailability() {
        this.available = !this.available;
        this.emitAvailability.emit(this.available);
  }

    toggleSidebar() {
        this.sidebarVisibility = !this.sidebarVisibility;
    }

  toggleScheduledVibiios(event) {
    this.scheduledVibiiosVisibility = !this.scheduledVibiiosVisibility;
    if (!this.scheduledVibiiosVisibility) {
      this.customerCategoryVisibility = true;
      this.profileVisibility = true;
    }
  }

  toggleCustomerCategoryVisibility(event) {
    this.customerCategoryVisibility = !this.customerCategoryVisibility;
    if (!this.customerCategoryVisibility) {
      this.scheduledVibiiosVisibility = true;
      this.profileVisibility = true;
    }
  }

  toggleProfileVisibility(event) {
    this.profileVisibility = !this.profileVisibility;
    if (!this.profileVisibility) {
      this.scheduledVibiiosVisibility = true;
      this.customerCategoryVisibility = true;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/sign_in');
  }
}
