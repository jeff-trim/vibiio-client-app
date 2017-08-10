import { Component, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
import { ConsumerNoteService } from '../../services/consumer-note.service';
import { VideoSnapshotService } from '../../services/video-snapshot.service';
import { ActivityService } from '../../services/activity.service';

declare var OT: any;

@Component({
    selector: 'appointment',
    templateUrl: 'appointment.component.html'
})

export class AppointmentComponent implements OnInit {
    onVibiio = false;
    updateStatusReminder = false;
    index: number;
    appointment: Appointment;
    consumer_id: number;
    user: User;
    session: any;
    vibiio: Vibiio;
    token: string;
    publisher: any;
    imgData: any;
    subscriber: any;

    constructor(private activatedRoute: ActivatedRoute,
                private tokenService: VideoChatTokenService,
                private snapshotService: VideoSnapshotService,
                private activityService: ActivityService) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
           this.index = params['id'];
        });

        this.activatedRoute.data.subscribe( (data) => {
            // appointment data
            this.appointment = data.appt.appointment;
            this.consumer_id = this.appointment.consumer_id;
            this.user = data.appt.appointment.user;
            // vibiio data
            this.vibiio = data.appt.appointment.vibiio;
            // this.session = OT.initSession(45500292, '1_MX40NTUwMDI5Mn5-MTUwMjI5NTkyMzQ3NH4wSlBsd29nSXZ5a3pqU1FpcmIxa3pFd3l-fg');
            this.session = OT.initSession(OPENTOK_API_KEY, this.vibiio.video_session_id);
            }, (error) => {
                console.log(error);
        });
    }

      async connectToSession(event) {
        this.tokenService.getToken(this.vibiio.id).subscribe((data) => {
            this.token = data.video_chat_auth_token.token;
            // this.token ="T1==cGFydG5lcl9pZD00NTUwMDI5MiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9OWUyMDE2MzBlNTM0OTI3NTY3ODNlOGFlZjQ4MzkwZjJjZmI2ZmMxMTpzZXNzaW9uX2lkPTFfTVg0ME5UVXdNREk1TW41LU1UVXdNakk1TlRreU16UTNOSDR3U2xCc2QyOW5TWFo1YTNwcVUxRnBjbUl4YTNwRmQzbC1mZyZjcmVhdGVfdGltZT0xNTAyMjk1OTIzJnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MDIyOTU5MjMuNTA0MTk2MTYzODk4JmV4cGlyZV90aW1lPTE1MDQ4ODc5MjM=";
            this.triggerActivity(this.vibiio.id,
                                 'Vibiiographer manually started video',
                                 'Video session started');
            this.session.connect(this.token, (error) => {
                // Video options
                const options = {
                    width: 312,
                    height: 461.1
                };

                // Initialize a publisher and publish the video stream to the session
                this.publisher = OT.initPublisher({insertDefaultUI: false}, options);
                this.session.publish(this.publisher);

                // Subscribe to stream created events
                this.session.on('streamCreated', (data) => {
                    this.subscriber = this.session.subscribe(data.stream, 'subscriber-stream', options,
                (stats) => {
                    // wait till subscriber is set
                    console.log('returned');
                    console.log(this.subscriber.isSubscribing());
                    this.captureSnapshot();
                });
                    this.onVibiio = true;
                });
                // subscribe to stream destroyed events
                this.session.on('streamDestroyed', (data) => {
                    this.onVibiio = false;
                    this.updateStatusReminder = true;
                });
            });
        });
    }

    // save snapshot
    async captureSnapshot() {
        // wait for image data
        this.imgData = await this.subscriber.getImgData();
        this.snapshotService.saveSnapshot(this.consumer_id, this.session.id, this.vibiio.id, this.imgData)
            .subscribe( (data) => { },
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

    endSession(event) {
        this.session.disconnect();
        this.triggerActivity(
            this.vibiio.id,
            'Vibiiographer manually ended video session',
            'Video session ended'
        );
    }
}
