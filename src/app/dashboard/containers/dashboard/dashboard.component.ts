import { Component, OnInit } from "@angular/core";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";

// Models
import { Vibiio } from "../../models/vibiio.interface";
import { NotificationFilterCriteria } from "../../models/notification-filter-criteria.interface";

// Services
import { AvailabilitySharedService } from "../../../shared/services/availability-shared.service";
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: "vib-vibiio",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  userAvailability = true;
  vibiio: Vibiio;
  vibiiographerProfile: any;
  waitingConsumers = [];
  notificationDrawerVisibility = false;
  notificationFilterCriteria: NotificationFilterCriteria;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private availabilitySharedService: AvailabilitySharedService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.vibiio = data.vibiio;
      this.vibiiographerProfile = data.myProfile;
      this.setNotificationFilterCriteria();
    });

    this.notificationService.subscribeToAvailabilityChannel();
    this.subscribeToUserAvailability();
    this.subscribeToWaitList();
    this.subscribeToClaimedAppointments();
  }

  setNotificationFilterCriteria() {
    this.notificationFilterCriteria = {
      languages: this.vibiiographerProfile.user.profile.languages,
      companyIds: this.vibiiographerProfile.user.profile.company_ids,
      isVibiioStaff: "Ascente" === this.vibiiographerProfile.user.company
    };
    this.notificationService.setfilterCriteria(this.notificationFilterCriteria);
  }

  subscribeToWaitList() {
    this.notificationService.waitListUpdates$.subscribe(waitListData => {
      this.waitingConsumers = waitListData;
    });
  }

  subscribeToUserAvailability() {
    this.availabilitySharedService.changeEmitted$.subscribe(available => {
      this.userAvailability = available;
    });
  }

  subscribeToClaimedAppointments() {
    this.notificationService.claimedAppointments$.subscribe(appointmentId => {
      this.navigateToAppointment(appointmentId);
    });
  }

  toggleNotificationDrawerVisibility(event) {
    this.notificationDrawerVisibility = !this.notificationDrawerVisibility;
  }

  claimAppointment(event) {
    this.notificationService.selectNotification(
      event,
      this.vibiiographerProfile.user.profile.id
    );
  }

  navigateToAppointment(appointmentId: number) {
    this.router.navigate(["dashboard/appointment/", appointmentId], {
      queryParams: { startVibiio: true },
      queryParamsHandling: "preserve"
    });
  }

  userIsAvailable(available: boolean) {
    this.userAvailability = available;
    this.availabilitySharedService.emitChange(available);
  }
}
