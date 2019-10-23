import { Component, Output, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { async } from "@angular/core/testing";
import { Observable } from "rxjs";
import { Location } from "@angular/common";

// Models
import { Appointment } from "../../models/appointment.interface";
import { User } from "../../models/user.interface";
import { Vibiio } from "../../models/vibiio.interface";
import { Address } from "../../models/address.interface";
import { VideoSnapshot } from "../../models/video-snapshot.interface";

// Services
import { AppointmentResolver } from "../../services/appointment.resolver.service";
import { AppointmentDetailsFormStatusService } from "../../services/appointment-details-form-status.service";
import { VideoChatService } from "../../../shared/services/video-chat.service";
import { AvailabilitySharedService } from "../../../shared/services/availability-shared.service";
import { SidebarCustomerStatusSharedService } from "../../../shared/services/sidebar-customer-status-shared.service";
import { VibiioUpdateService } from "../../../shared/services/vibiio-update.service";
import { AppointmentService } from "../../services/appointment.service";
import { ActivityService } from "../../../shared/services/activity.service";
import { VideoSnapshotService } from "../../../shared/services/video-snapshot.service";
import { VibiioProfileService } from "../../services/vibiio-profile.service";
import { Consultant } from "../../models/consultant.interface";

@Component({
  selector: "vib-appointment",
  templateUrl: "appointment.component.html"
})
export class AppointmentComponent implements OnInit, OnDestroy {
  onVibiio = false;
  consumer_id: number;
  vibiio: Vibiio;
  appointment: Appointment;
  address: Address;
  relocationAddress: Address;
  user: User;
  snapshots: VideoSnapshot[];
  userTimeZone: string;
  startVibiioParams: boolean;
  isUpdatingForms = false;
  isEditingForms = false;
  alive: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private snapshotService: VideoSnapshotService,
    private activityService: ActivityService,
    private updateAppointmentService: AppointmentService,
    private vibiioUpdateService: VibiioUpdateService,
    private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
    private availabilitySharedService: AvailabilitySharedService,
    private router: Router,
    private videoService: VideoChatService,
    private formStatusService: AppointmentDetailsFormStatusService,
    private vibiioProfileService: VibiioProfileService,
    private location: Location
  ) {}

  ngOnInit() {
    this.alive = true;
    this.activatedRoute.data.subscribe(
      (data: any) => {
        this.appointment = data.appt.appointment;
        this.address = this.appointment.address;
        this.relocationAddress = this.appointment.relocation_address;
        this.userTimeZone = data.appt.appointment.user.time_zone;
        this.consumer_id = this.appointment.consumer_id;
        this.user = data.appt.appointment.user;
        this.vibiio = data.appt.appointment.vibiio;
        this.snapshots = data.appt.appointment.snapshots;
        this.getStartParams();
      },
      error => {
        console.log(error);
      }
    );
    this.subscribeToEndCall();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getStartParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.startVibiioParams = params["startVibiio"] || false;
      if (this.startVibiioParams && this.isCorrectAppointment()) {
        this.answerCall();
      }
    });
  }

  isCorrectAppointment() {
    return (
      this.activatedRoute.snapshot.params.id === this.appointment.id.toString()
    );
  }

  subscribeToEndCall() {
    this.videoService.hangingUp$
      .takeWhile(() => this.alive)
      .subscribe(vibiio => {
        this.endCallActions();
      });
  }

  refreshProfile() {
    this.vibiioProfileService
      .getVibiio(this.vibiio.id)
      .subscribe((data: any) => {
        this.vibiio = data.vibiio;
        this.snapshots = data.vibiio.snapshots;
      });
  }

  answerCall() {
    this.beginCallActions();
    this.location.replaceState(`dashboard/appointment/${this.appointment.id}`);
    this.videoService.call(this.vibiio, false);
  }

  callConsumer() {
    this.beginCallActions();
    this.videoService.call(this.vibiio, true);
  }

  claimVibiio(): Vibiio {
    if (this.vibiio.vibiiographer_id === null) {
      this.updateAppointmentService
        .updateVibiiographer(this.appointment.id)
        .subscribe(
          (data: any) => {
            return data.vibiio;
          },
          (error: any) => {
            console.log("error ", error);
          }
        );
    }
    return this.vibiio;
  }

  async beginCallActions() {
    this.onVibiio = true;
    this.availabilitySharedService.emitChange(false);
    this.vibiio = await this.claimVibiio();
    this.updateVibiioStatus({ status: "current" });
  }

  endCallActions() {
    this.onVibiio = false;
    this.availabilitySharedService.emitChange(true);
    this.refreshProfile();
  }

  updateVibiioStatus(event: any) {
    const options = { status: event.status };

    this.vibiioUpdateService.updateVibiio(options, this.vibiio.id).subscribe(
      (data: any) => {
        this.vibiio.status = data.vibiio.status;
        this.sidebarCustomerStatusSharedService.emitChange(data);
      },
      (error: any) => {
        console.log("error updating claim status");
      }
    );
  }

  updateNotes(appointment_id) {
    this.updateAppointmentService
      .getAppointmentDetails(appointment_id)
      .subscribe(
        (data: any) => {
          this.appointment = data.appointment;
        },
        (error: any) => {
          console.log("error ", error);
        }
      );
  }

  refreshAddress() {
    this.formStatusService.onCancel();
  }

  onEdit(formChanged: boolean) {
    this.formStatusService.onFormEdit();
    this.isEditingForms = true;
  }

  onUpdate() {
    this.formStatusService.onFormUpdate();
    this.isUpdatingForms = true;
  }
}
