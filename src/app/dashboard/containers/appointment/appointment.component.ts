import { Component, Output, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { async, inject } from '@angular/core/testing';

// Models
import { Appointment } from '../../models/appointment.interface';
import { User } from '../../models/user.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { Address } from '../../models/address.interface';

// Services
import { AppointmentResolver } from '../../services/appointment.resolver.service';
import { AppointmentDetailsFormStatusService } from '../../services/appointment-details-form-status.service';
import { VideoChatService } from '../../../shared/services/video-chat.service';
import { AvailabilitySharedService } from '../../../shared/services/availability-shared.service';
import { SidebarCustomerStatusSharedService } from '../../../shared/services/sidebar-customer-status-shared.service';
import { VibiioUpdateService } from '../../../shared/services/vibiio-update.service';
import { AppointmentService } from '../../services/appointment.service';
import { ActivityService } from '../../../shared/services/activity.service';
import { VideoSnapshotService } from '../../../shared/services/video-snapshot.service';
import { VibiioProfileService } from '../../services/vibiio-profile.service';
import { Location } from '@angular/common';
import { VideoSnapshot } from '../../models/video-snapshot.interface';

@Component({
    selector: 'vib-appointment',
    templateUrl: 'appointment.component.html'
})

export class AppointmentComponent implements OnInit, OnDestroy {
    onVibiio = false;
    consumer_id: number;
    vibiio: Vibiio;
    index: number;
    appointment: Appointment;
    address: Address;
    user: User;
    snapshots: VideoSnapshot[];
    userTimeZone: string;
    startVibiioParams: boolean;
    isUpdatingForms = false;
    isEditingForms = false;
    alive: boolean;

    constructor(private activatedRoute: ActivatedRoute,
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
                private location: Location,
                private ref: ChangeDetectorRef) { }

    ngOnInit() {
        this.alive = true;
        this.activatedRoute.params.subscribe((params: Params) => {
            this.index = params['id'];
        });

        this.activatedRoute.data.subscribe( (data) => {
            this.appointment = data.appt.appointment;
            this.address = this.appointment.address;
            this.userTimeZone = data.appt.appointment.user.time_zone;
            this.consumer_id = this.appointment.consumer_id;
            this.user = data.appt.appointment.user;
            this.vibiio = data.appt.appointment.vibiio;
            this.snapshots = data.appt.appointment.snapshots;
            this.getStartParams();
        }, (error) => {
            console.log(error);
        });
        this.subscribeToEndCall();
    }

    ngOnDestroy() {
        this.alive = false;
    }

    getStartParams() {
        this.activatedRoute
            .queryParams
            .subscribe(params => {
                // Defaults to false if no query param provided.
                this.startVibiioParams = params['startVibiio'] || false;
                if (this.startVibiioParams) {
                    this.answerCall();
                }
        });
    }

    subscribeToEndCall() {
        this.videoService.hangingUp$
          .takeWhile(() => this.alive)
          .subscribe( (vibiio) => {
            this.endCallActions();
        });
    }

    refreshProfile() {
        this.vibiioProfileService
            .getVibiio(this.vibiio.id)
            .subscribe( (data) => {
                console.log('refreshing', data);
                this.vibiio = data.vibiio;
                this.snapshots = data.vibiio.snapshots;
        });
    }

    answerCall() {
        this.location.replaceState(`dashboard/appointment/${this.appointment.id}`);
        this.beginCallActions();
        this.videoService.call(this.vibiio, false);
    }

    callConsumer() {
        this.beginCallActions();
        this.videoService.call(this.vibiio, true);
    }

    claimVibiio(): Vibiio {
        console.log('claiming', this.vibiio.id);
        if (this.vibiio.vibiiographer_id === null) {
            this.updateAppointmentService
                .updateVibiiographer(this.appointment.id)
                .subscribe((data) => {
                    console.log('claim data', data);
                    return data.vibiio;
                },
                (error: any) => {
                    console.log('error ', error);
            });
        }
        return this.vibiio;
    }

    async beginCallActions() {
        this.onVibiio = true;
        this.availabilitySharedService.emitChange(false);
        this.vibiio = await this.claimVibiio();
        this.updateVibiioStatus({status: 'claim_in_progress'});
    }

    endCallActions() {
        this.onVibiio = false;
        this.availabilitySharedService.emitChange(true);
        this.refreshProfile();
    }

    updateVibiioStatus(event: any) {
        console.log('updating', event);

        const options = { status: event.status };

        this.vibiioUpdateService
            .updateVibiio(options, this.vibiio.id)
            .subscribe( (data) => {
                this.vibiio.status = data.vibiio.status;
                this.sidebarCustomerStatusSharedService.emitChange(data);
            }, (error: any) => {
                console.log('error updating claim status');
            });
    }

    updateNotes(appointment_id) {
        this.updateAppointmentService.getAppointmentDetails(appointment_id)
            .subscribe((data) => {
                this.appointment = data.appointment;
            },
        (error: any) => {
            console.log('error ', error);
        });
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
