import { Component,
         Output,
         Input,
         EventEmitter,
         OnInit,
         ComponentRef,
         ComponentFactoryResolver,
         ViewChild,
         ViewContainerRef,
         ApplicationRef,
         Injector,
         EmbeddedViewRef} from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { SidebarScheduleComponent } from '../../components/sidebar-schedule/sidebar-schedule.component';
import { SidebarCustomerComponent } from '../../components/sidebar-customer/sidebar-customer.component';
import { VibiiographerCallComponent } from '../../../shared/containers/vibiiographer-call/vibiiographer-call.component';

// Services
import { MyAppointmentsService } from '../../services/my-appointments.service';
import { CustomerStatusCountService } from '../../services/customer-status-count.service';
import { SidebarMyVibiioSharedService } from '../../services/sidebar-my-vibiio-shared.service';
import { MyAvailabilityService } from '../../services/my-availability.service';
import { AuthService } from '../../../services/auth.service';
import { SidebarCustomerStatusSharedService } from '../../../shared/services/sidebar-customer-status-shared.service';

// Interfaces
import { CustomerStatusCount } from '../../models/customer-status-count.interface';
import { Appointment} from '../../models/appointment.interface';
import { Observable } from 'rxjs/Rx';
import { Vibiio } from '../../models/vibiio.interface';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { VideoChatService } from '../../../shared/services/video-chat.service';

const vibiiographerCallComponent = VibiiographerCallComponent;
type VibiiographerCall = VibiiographerCallComponent;

@Component({
    selector: 'vib-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent implements OnInit, OnDestroy {
  myScheduledVibiios: any;
  customersCategories: CustomerStatusCount[];
  scheduledVibiiosActive = false;
  customerCategoriesActive = false;
  profileActive = false;
  expertsActive = false;
  vibiiographersActive = false;
  sidebarVisibility: boolean;
  userTimeZone: string;
  vibiio: Vibiio;
  alive = true;
  videoState: string;

  @Input()
  available: boolean;

  @Output()
  emitAvailability: EventEmitter<boolean> = new EventEmitter<boolean>();

  component: ComponentRef<VibiiographerCall>;

    constructor(private reslover: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector,
                private videoChatService: VideoChatService,
                private appointmentsService: MyAppointmentsService,
                private statusService: CustomerStatusCountService,
                private activatedRoute: ActivatedRoute,
                private availabilityService: MyAvailabilityService,
                private sidebarMyVibiioSharedService: SidebarMyVibiioSharedService,
                private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
                private authService: AuthService,
                private router: Router) {

        // subscribes to shared service and listens for changes passed from the
        // my vibiio container
        sidebarMyVibiioSharedService.changeEmitted$.subscribe(
            response => this.myScheduledVibiios = response.my_day
        );
       // subscribes to shared service and listens for changes passed from the
        // my vibiio container
        this.sidebarCustomerStatusSharedService.changeEmitted$.subscribe(
            response => {
              this.getStatusUpdate();
            }
        );
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.userTimeZone = data.appointments.appointments.user_time_zone;
            this.myScheduledVibiios = data.sidebarMyDay.my_day;
        });

        this.subscribeToStartCall();
        this.subscribeToEndCall();
        this.getStatusUpdate();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  subscribeToStartCall() {
    this.videoChatService.calling$
    .takeWhile(() => this.alive)
    .subscribe( (vibiioCall) => {
      this.vibiio = vibiioCall.vibiio;
      this.component = this.reslover
                              .resolveComponentFactory<VibiiographerCall>(vibiiographerCallComponent)
                              .create(this.injector);

      this.component.instance.vibiio = vibiioCall.vibiio;
      this.component.instance.consumerName = this.vibiio.consumer_name;
      this.component.instance.outgoingCall = vibiioCall.outgoing;
      this.appRef.attachView(this.component.hostView);
      const domElem = (this.component.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
    });
  }

  subscribeToEndCall() {
    this.videoChatService.hangingUp$
      .takeWhile(() => this.alive)
      .subscribe( (vibiio) => {
        this.appRef.detachView(this.component.hostView);
        this.component.destroy();
    });
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
    this.scheduledVibiiosActive = !this.scheduledVibiiosActive;
    if (this.scheduledVibiiosActive) {
      this.customerCategoriesActive = false;
      this.profileActive = false;
      this.expertsActive = false;
      this.vibiiographersActive = false;
    }
  }

  toggleCustomerCategories() {
    this.customerCategoriesActive = !this.customerCategoriesActive;
    if (this.customerCategoriesActive) {
      this.scheduledVibiiosActive = false;
      this.profileActive = false;
      this.expertsActive = false;
      this.vibiiographersActive = false;
    }
  }

  toggleProfile() {
    this.profileActive = !this.profileActive;
    if (this.profileActive) {
      this.scheduledVibiiosActive = false;
      this.customerCategoriesActive = false;
      this.expertsActive = false;
      this.vibiiographersActive = false;
    }
  }

  toggleExperts() {
    this.expertsActive = !this.expertsActive;
    if (this.expertsActive) {
      this.profileActive = false;
      this.scheduledVibiiosActive = false;
      this.customerCategoriesActive = false;
      this.vibiiographersActive = false;
    }
  }

  toggleVibiiographers() {
    this.vibiiographersActive = !this.vibiiographersActive;
    if (this.vibiiographersActive) {
      this.profileActive = false;
      this.scheduledVibiiosActive = false;
      this.customerCategoriesActive = false;
      this.expertsActive = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/sign_in');
  }
}
