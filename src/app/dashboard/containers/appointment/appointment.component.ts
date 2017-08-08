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
    user: User;
    session: any;
    vibiio: Vibiio;
    // token: VideoChatToken
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
            this.user = data.appt.appointment.user;
            // vibiio data
            this.vibiio = data.appt.appointment.vibiio;
            // this.session = OT.initSession(OPENTOK_API_KEY, '1_MX40NTUwMDI5Mn5-MTUwMjIxNTA4MDg1OH5XUXdtTVJZdmw3QTYvc204ME45UFdTa0d-fg');
            this.session = OT.initSession(OPENTOK_API_KEY, this.vibiio.video_session_id);
            }, (error) => {
                console.log(error);
        });
    }

      connectToSession(event) {
        this.tokenService.getToken(this.vibiio.id).subscribe((data) => {
            console.log('data: ', data);
            this.token = data.video_chat_auth_token.token;
            console.log(this.token);
                // this.token ="T1==cGFydG5lcl9pZD00NTUwMDI5MiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9ZjlkOWMxMzlkNWM4OTM1NjUyZTVjNmYxOTkyOThmOTQ1M2VhM2NiMTpzZXNzaW9uX2lkPTFfTVg0ME5UVXdNREk1TW41LU1UVXdNakl4TlRBNE1EZzFPSDVYVVhkdFRWSlpkbXczUVRZdmMyMDRNRTQ1VUZkVGEwZC1mZyZjcmVhdGVfdGltZT0xNTAyMjE1MDgwJnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MDIyMTUwODAuODg1NzkxNDE5MDEyNCZleHBpcmVfdGltZT0xNTA0ODA3MDgw";
            this.triggerActivity(this.vibiio.id,
                                 'Vibiiographer manually started video',
                                 'Video session started')
            this.session.connect(this.token, (error) => {
                console.log('session: ', this.session);
                // Video options
                const options = {
                    width: 312,
                    height: 461.1
                };

                // Initialize a publisher and publish the video stream to the session
                this.publisher = OT.initPublisher({insertDefaultUI: false}, options);
                console.log('publisher: ', this.session);
                this.session.publish(this.publisher);

                // Subscribe to stream created events
                this.session.on('streamCreated', (data) => {
                    console.log('sessionOnCreted: ', this.session);
                  console.log('eventOnCreated: ', data);
                    this.subscriber = this.session.subscribe(data.stream, 'subscriber-stream', 'subscriber', options);
                  // save snapshot
                  this.imgData = this.subscriber.getImgData();
                  this.snapshotService.saveSnapshot(this.session.id, this.imgData);
                  this.onVibiio = true;
                });
                // subscribe to stream destroyed events
                this.session.on('streamDestroyed', (data) => {
                    this.onVibiio = false;
                    this.updateStatusReminder = true;
                    console.log('Stream ' + data.stream.name + ' ended. ' + data.reason);
                }).connect(this.token);
            });
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
