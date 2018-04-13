import { Component, Output, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// Components
import { AppointmentDetailsComponent } from '../../components/appointment-details/appointment-details.component';

// Models
import { Appointment } from '../../models/appointment.interface';
import { User } from '../../models/user.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { VideoChatToken } from '../../models/video-chat-token.interface';
import { OPENTOK_API_KEY } from '../../../../environments/environment';

// Services
import { AppointmentResolver } from '../../services/appointment.resolver.service';
import { VideoChatTokenService } from '../../services/video-chat-token.service';
import { NoteService } from '../../services/note.service';
import { VideoSnapshotService } from '../../services/video-snapshot.service';
import { ActivityService } from '../../services/activity.service';
import { AppointmentService } from '../../services/appointment.service';
import { VibiioUpdateService } from '../../services/vibiio-update.service';
import { SidebarCustomerStatusSharedService } from '../../services/sidebar-customer-status-shared.service';
import { AvailabilitySharedService } from '../../services/availability-shared.service';
import { Address } from '../../models/address.interface';

declare var OT: any;

@Component({
    selector: 'vib-appointment',
    templateUrl: 'appointment.component.html'
})

export class AppointmentComponent implements OnInit, AfterViewInit {
    onVibiio = false;
    vibiioConnecting = false;
    index: number;
    appointment: Appointment;
    address: Address;
    consumer_id: number;
    user: User;
    session: any;
    vibiio: Vibiio;
    token: string;
    publisher: any;
    imgData: any;
    subscriber: any;
    neworkDisconnected = false;
    userTimeZone: string;
    startVibiioParams: boolean;

    constructor(private activatedRoute: ActivatedRoute,
                private tokenService: VideoChatTokenService,
                private snapshotService: VideoSnapshotService,
                private activityService: ActivityService,
                private updateAppointmentService: AppointmentService,
                private vibiioUpdateService: VibiioUpdateService,
                private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
                private availabilitySharedService: AvailabilitySharedService,
                private router: Router) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.index = params['id'];
        });

        this.activatedRoute.data.subscribe( (data) => {
            // appointment data
            this.appointment = data.appt.appointment;
            this.address = this.appointment.address;
            this.userTimeZone = data.appt.appointment.user.time_zone;
            this.consumer_id = this.appointment.consumer_id;
            this.user = data.appt.appointment.user;
            // vibiio data
            this.vibiio = data.appt.appointment.vibiio;
            // this.session = OT.initSession(45500292, '1_MX40NTUwMDI5Mn5-MTUwMjM5MTI3MjkzNn5wWmpzVzI4QlNlUE1TZ2toMC96QUhHWWl-fg');
            this.session = OT.initSession(OPENTOK_API_KEY, this.vibiio.video_session_id);
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
            this.connectToSession();
            this.vibiioConnecting = true;
            this.onVibiio = true;
        }
    }

    async connectToSession() {
        this.tokenService.getToken(this.vibiio.id).subscribe((data) => {
            this.token = data.video_chat_auth_token.token;
            this.triggerActivity(this.vibiio.id,
                'Vibiiograher manually started video',
                'Video session started');
                this.session.connect(this.token, (error) => {
                    // Video options - Append sets it as the child of the id below
                    const options = {
                        insertMode: 'append',
                        fitMode: 'contain',
                        width: '100%',
                        height: '100%'
                    };

                    // Initialize a publisher and publish the audio only stream to the session
                    this.publisher = OT.initPublisher({insertDefaultUI: false}, options);
                    this.session.publish(this.publisher).publishVideo(false);

                    // Subscribe to stream created events
                    this.session.on('streamCreated', (data) => {
                    this.vibiioConnecting = false;
                    this.subscriber = this.session.subscribe(data.stream, 'subscriber-stream', options,
                    (stats) => {
                        // wait till subscriber is set
                        this.captureSnapshot();
                        this.updateVibiioStatus();
                });
                    this.neworkDisconnected = false;
                    this.onVibiio = true;
                });

                // subscribe to stream destroyed events
                this.session.on('streamDestroyed', (data) => {
                    this.onVibiio = false;
                    this.availabilitySharedService.emitChange(true);
                    this.session.disconnect();
                    this.router.navigateByUrl('/dashboard/vibiio-profile/' + this.vibiio.id);

                    if (data.reason === 'networkDisconnected') {
                        data.preventDefault();
                        const subscribers = this.session.getSubscribersForStream(data.stream);
                        if (subscribers.length > 0) {
                            // Display error message inside the Subscriber
                            this.neworkDisconnected = true;
                            data.preventDefault();   // Prevent the Subscriber from being removed
                        }
                    }
                });
            });
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

    triggerActivity(vibiio_id: number, message: string, name: string) {
        this.activityService.postActivity(
            vibiio_id,
            message,
            name
            ).subscribe((data) => {});
    }

    updateVibiioStatus() {
        const options = {
            status: 'claim_in_progress'
        };

        this.vibiioUpdateService
            .updateVibiio(options, this.vibiio.id)
            .subscribe( (data) => {
                this.vibiio.status = data.vibiio.status;
                this.sidebarCustomerStatusSharedService.emitChange(data);
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
        this.updateVibiioStatus();
    }

    claimVibiio(event) {
        this.updateAppointmentService.updateVibiiographer(this.appointment.id)
            .subscribe((data) => {
            },
        (error: any) => {
            console.log('error ', error);
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
}
