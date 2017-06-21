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
import { DashboardService } from '../../services/dashboard.service';

declare var OT: any;

@Component({
    selector: 'appointment',
    templateUrl: 'appointment.component.html'
})

export class AppointmentComponent implements OnInit {
    index: number;
    appointment: Appointment;
    user: User;
    session: any;
    vibiio: Vibiio;
    token: VideoChatToken;
    

    constructor(private activatedRoute: ActivatedRoute,
                private tokenService: VideoChatTokenService){}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
           this.index = params['id'];
        });
        
        this.activatedRoute.data.subscribe( (data) => {
            //vibiio data
            console.log(data);
            this.vibiio = data.vibiio;
            this.session = OT.initSession(OPENTOK_API_KEY, this.vibiio.video_session_id);
            //appointment data
            this.appointment = data.appt.appointment;
            this.user = data.appt.appointment.user;
            }, (error) => {
                console.log(error);
        });
    }

      connectToSession() {
        this.tokenService.getToken().subscribe( (data) => {
            this.token = data.video_chat_auth_token.token;
            this.session.connect(this.token, (error) => {
                // Video options
                const options = {
                insertMode: 'append',
                width: 280,
                height: 280
                };

                // Initialize a publisher and publish the video stream to the session
                const publisher = OT.initPublisher('publisher-stream', options);
                this.session.publish(publisher);

                // Subscribe to stream created events
                this.session.on('streamCreated', (event) => {
                    this.session.subscribe(event.stream, 'subscriber-stream', options);
                });
            });
        });
    }
}
