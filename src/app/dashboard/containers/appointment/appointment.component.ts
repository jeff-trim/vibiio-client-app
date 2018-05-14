import { Component, Output, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { async, inject } from '@angular/core/testing';
import * as screenfull from 'screenfull';

// Models
import { Appointment } from '../../models/appointment.interface';
import { User } from '../../models/user.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { VideoChatToken } from '../../models/video-chat-token.interface';
import { OPENTOK_API_KEY } from '../../../../environments/environment';
import { Address } from '../../models/address.interface';

// Services
import { AppointmentResolver } from '../../services/appointment.resolver.service';
import { NoteService } from '../../services/note.service';
import { AppointmentDetailsFormStatusService } from '../../services/appointment-details-form-status.service';
import { VIDEO_OPTIONS } from '../../../constants/video-options';
import { VideoChatService } from '../../../shared/services/video-chat.service';
import { AvailabilitySharedService } from '../../../shared/services/availability-shared.service';
import { SidebarCustomerStatusSharedService } from '../../../shared/services/sidebar-customer-status-shared.service';
import { VibiioUpdateService } from '../../../shared/services/vibiio-update.service';
import { AppointmentService } from '../../services/appointment.service';
import { ActivityService } from '../../../shared/services/activity.service';
import { VideoSnapshotService } from '../../../shared/services/video-snapshot.service';
import { VibiioProfileService } from '../../services/vibiio-profile.service';
import { Location } from '@angular/common';

@Component({
    selector: 'vib-appointment',
    templateUrl: 'appointment.component.html'
})

export class AppointmentComponent implements OnInit, AfterViewInit, OnDestroy {
    onVibiio = false;
    consumer_id: number;
    vibiio: Vibiio;
    index: number;
    appointment: Appointment;
    address: Address;
    user: User;
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
                private changeDetector: ChangeDetectorRef,
                private location: Location) { }

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
        }, (error) => {
            console.log(error);
        });

        this.activatedRoute
            .queryParams
            .subscribe(params => {
            // Defaults to false if no query param provided.
                this.startVibiioParams = params['startVibiio'] || false;
        });
        this.subscribeToEndCall();
    }

    ngAfterViewInit() {
        // Video session starts if vibiio was started from dashboard
        if (this.startVibiioParams) {
            this.answerCall();
            this.beginCallActions();
            this.location.replaceState(`dashboard/appointment/${this.appointment.id}`);
        }
    }

    ngOnDestroy() {
        this.alive = false;
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
                this.vibiio = data.vibiio;
        });
    }

    answerCall() {
        this.beginCallActions();
        this.videoService.call(this.vibiio, false);
    }

    async callConsumer() {
        this.vibiio = await this.claimVibiio();
        this.beginCallActions();
        this.videoService.call(this.vibiio, true);
    }

    claimVibiio(): Vibiio {
        if (this.appointment.vibiiographer_id === null) {
            this.updateAppointmentService
                .updateVibiiographer(this.appointment.id)
                .subscribe((data) => {
                    return data.vibiio;
                },
                (error: any) => {
                    console.log('error ', error);
            });
        }
        return this.vibiio;
    }

    beginCallActions() {
        this.onVibiio = true;
        this.availabilitySharedService.emitChange(false);
    }

    endCallActions() {
        this.onVibiio = false;
        this.availabilitySharedService.emitChange(true);
        this.refreshProfile();
    }

    updateVibiioStatus(event: any) {
        const options = { status: event.status };

        this.vibiioUpdateService
            .updateVibiio(options, this.vibiio.id)
            .subscribe( (data) => {
                this.vibiio.status = data.vibiio.status;
                this.sidebarCustomerStatusSharedService.emitChange(data);
                this.changeDetector.detectChanges();
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
        this.changeDetector.detectChanges();
    }

    onUpdate() {
        this.formStatusService.onFormUpdate();
        this.isUpdatingForms = true;
        this.changeDetector.detectChanges();
    }
}
