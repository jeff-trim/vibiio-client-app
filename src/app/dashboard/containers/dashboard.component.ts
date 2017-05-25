import { Component, OnInit} from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';


// Containers
import { SidebarComponent } from './sidebar.component';
import { MyProfileComponent } from './my-profile.component';

// Models
import { Vibiio } from '../models/vibiio.interface';
import { VideoChatToken } from '../models/video-chat-token.interface';
import { OPENTOK_API_KEY } from '../../../environments/environment';

// Services
import { VideoChatTokenService } from '../services/video-chat-token.service';

declare var OT: any;


@Component({
    selector: 'app-vibiio',
    styleUrls: ['./dashboard.component.scss'],
  template: `
<div class="row">
  <app-sidebar
    class="col-xs-12
    col-md-3"></app-sidebar>
  <div class="col-xs-12
col-md-9">
    <router-outlet></router-outlet>
  </div>
</div>
  `,
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
