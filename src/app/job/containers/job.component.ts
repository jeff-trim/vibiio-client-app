import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Models
import { Job } from '../models/job.interface';
import { VideoChatToken } from '../models/video-chat-token.interface';
import { OPENTOK_API_KEY } from '../../../environments/environment';

// Services
import { VideoChatTokenService } from '../services/video-chat-token.service';

declare var OT: any;

@Component({
  selector: 'app-job',
  template: `
  <div class="video-container">
    <p>Video Session ID:</p>
    <p>{{ job.video_session_id }}</p>
    <button (click)="connectToSession()">Connect to video session</button>
    <div id="publisher-stream"></div>
    <div id="subscriber-stream"></div>
  </div>
  `,
  styleUrls: ['./job.component.scss']
})

export class JobComponent implements OnInit {
  ot: any;
  session: any;
  job: Job;
  token: VideoChatToken;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: VideoChatTokenService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe( (data: { job: Job }) => {
      this.ot = OT;
      this.job = data.job;
      this.session = OT.initSession(OPENTOK_API_KEY, this.job.video_session_id);
    });
  }

  connectToSession() {
    this.tokenService.getToken().subscribe( (data) => {
      this.token = data;
      this.session.connect(this.token.token, (error) => {
        // Video options
        const options = {
          insertMode: 'append',
          width: 280,
          height: 280
        };

        // Initialize a publisher and publish the video stream to the session
        const publisher = this.ot.initPublisher('publisher-stream', options);
        this.session.publish(publisher);

        // Subscribe to stream created events
        this.session.on('streamCreated', (event) => {
          this.session.subscribe(event.stream, 'subscriber-stream', options);
        });
      });
    });
  }
}
