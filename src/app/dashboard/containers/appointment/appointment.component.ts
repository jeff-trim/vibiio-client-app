import { Component, Output, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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

@Component({
    selector: 'vib-appointment',
    templateUrl: 'appointment.component.html'
})

export class AppointmentComponent implements OnInit, AfterViewInit {
    onVibiio = false;
    vibiioConnecting = false;
    token: string;
    publisher: any;
    subscriber: any;
    imgData: any;
    session: any;
    consumer_id: number;
    vibiio: Vibiio;
    index: number;
    appointment: Appointment;
    address: Address;
    user: User;
    networkDisconnected = false;
    userTimeZone: string;
    startVibiioParams: boolean;
    vibiioFullscreen = false;
    isUpdatingForms = false;
    isEditingForms = false;

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
                private changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
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
            this.session = this.videoService.initSession(this.vibiio.video_session_id);
        }, (error) => {
            console.log(error);
        });

        this.activatedRoute
            .queryParams
            .subscribe(params => {
            // Defaults to false if no query param provided.
                this.startVibiioParams = params['startVibiio'] || false;
        });
    }

    ngAfterViewInit() {
        // Video session starts if vibiio was started from dashboard
        if (this.startVibiioParams) {
            this.getToken();
        }
    }

    getToken() {
        this.vibiioConnecting = true;
        this.changeDetector.detectChanges();
        this.videoService.getToken(this.vibiio.id).subscribe((data) => {
            this.token = data.video_chat_auth_token.token;
            this.connectToSession();
        });
    }

    private connectToSession() {
        this.triggerActivity(this.vibiio.id,
            'Vibiiograher manually started video',
            'Video session started');

        this.session.connect(this.token, () => {
            this.initPublisher();
            this.hideVibiiographerVideo();
            this.subscribeToStreamCreatedEvents();
            this.subscribeToStreamDestroyedEvents();
        });
    }

    private initPublisher() {
        this.publisher = this.videoService.initPublisher();
    }

    private hideVibiiographerVideo() {
        this.session.publish(this.publisher).publishVideo(false);
    }

    private subscribeToStreamCreatedEvents() {
        this.session.on('streamCreated', (data) => {
            this.vibiioConnecting = false;
            this.changeDetector.detectChanges();
             this.subscriber = this.session.subscribe(data.stream, 'subscriber-stream', VIDEO_OPTIONS,
            (stats) => {
                // wait till subscriber is set
                this.captureSnapshot();
                this.updateVibiioStatus({status: 'claim_in_progress'});
        });
            this.networkDisconnected = false;
            this.onVibiio = true;
            this.changeDetector.detectChanges();
        });
    }

    private subscribeToStreamDestroyedEvents() {
        this.session.on('streamDestroyed', (data) => {
            this.onVibiio = false;
            this.availabilitySharedService.emitChange(true);
            this.session.disconnect();
            this.changeDetector.detectChanges();
            this.router.navigateByUrl('/dashboard/vibiio-profile/' + this.vibiio.id);

            if (data.reason === 'networkDisconnected') {
                data.preventDefault();
                const subscribers = this.session.getSubscribersForStream(data.stream);
                if (subscribers.length > 0) {
                    // Display error message inside the Subscriber
                    this.networkDisconnected = true;
                    this.changeDetector.detectChanges();
                    data.preventDefault();   // Prevent the Subscriber from being removed
                }
            }
        });
    }

    // save snapshot
    async captureSnapshot() {
        // wait for image data
        this.imgData = await this.subscriber.getImgData();
        this.snapshotService.saveSnapshot(this.consumer_id, this.session.id, this.vibiio.id, this.imgData)
            .subscribe( (data) => {},
                (error) => {
                    console.log('error ', error);
            });
    }

  private triggerActivity(vibiio_id: number, message: string, name: string) {
        this.activityService.postActivity(
            vibiio_id,
            message,
            name
            ).subscribe((data) => {});
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

    endSession() {
        this.session.disconnect();
        this.triggerActivity(
            this.vibiio.id,
            'Vibiiographer manually ended video session',
            'Video session ended'
        );
        this.availabilitySharedService.emitChange(true);
        this.vibiioConnecting = false;
        this.changeDetector.detectChanges();
        this.router.navigateByUrl('/dashboard/vibiio-profile/' + this.vibiio.id);
    }

    claimVibiio(event) {
        if (this.appointment.vibiiographer_id === null) {
            this.updateAppointmentService
                .updateVibiiographer(this.appointment.id)
                .subscribe((res) => {},
                (error: any) => {
                    console.log('error ', error);
            });
        }
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

    toggleVibiioFullscreen() {
        this.vibiioFullscreen = !this.vibiioFullscreen;
        this.changeDetector.detectChanges();
        if (screenfull.enabled) {
          screenfull.toggle();
        }
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
