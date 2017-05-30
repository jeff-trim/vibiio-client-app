import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';


// Components
import { SidebarComponent } from './../sidebar/sidebar.component';
// Models
import { Vibiio } from '../../models/vibiio.interface';
import { VideoChatToken } from '../../models/video-chat-token.interface';
import { OPENTOK_API_KEY } from '../../../../environments/environment';

// Services
import { VideoChatTokenService } from '../../services/video-chat-token.service';

declare var OT: any;

@Component({
  selector: 'app-vibiio',
  template: `
<div class="row center-xs video-container">
  <div class="col-xs-12">
    <p>Video Session ID:</p>
    <p>{{ vibiio.video_session_id }}</p>
  </div>
  <div class="col-xs-12">
    <button (click)="connectToSession()"
            class="button button-primary">
      Connect to video session
    </button>
  </div>
    <div id="publisher-stream"></div>
    <app-sidebar></app-sidebar>
    <div id="subscriber-stream"></div>
  </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  session: any;
  vibiio: Vibiio;
  token: VideoChatToken;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: VideoChatTokenService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe( (data) => {
      this.vibiio = data.vibiio;
      this.session = OT.initSession(OPENTOK_API_KEY, this.vibiio.video_session_id);
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
