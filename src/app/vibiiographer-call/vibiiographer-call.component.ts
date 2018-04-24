import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as screenfull from 'screenfull';
import { VIDEO_OPTIONS } from '../constants/video-options';
import { Vibiio } from '../dashboard/models/vibiio.interface';
import { WindowRefService } from '../services/window-ref.service';
import { VideoChatService } from '../dashboard/services/video-chat.service';
import { SidebarCustomerStatusSharedService } from '../dashboard/services/sidebar-customer-status-shared.service';
import { VibiioUpdateService } from '../dashboard/services/vibiio-update.service';
import { VideoSnapshotService } from '../dashboard/services/video-snapshot.service';
import { ActivityService } from '../dashboard/services/activity.service';
import { AvailabilitySharedService } from '../dashboard/services/availability-shared.service';

@Component({
  selector: 'vib-vibiiographer-call',
  templateUrl: './vibiiographer-call.component.html',
  styleUrls: ['./vibiiographer-call.component.scss']
})

export class VibiiographerCallComponent implements OnInit {
  vibiioConnecting = true;
  onVibiio = false;
  vibiioFullscreen = false;
  networkDisconnected = false;
  vibiio: Vibiio;
  token: string;
  publisher: any;
  subscriber: any;
  imgData: any;
  session: any;

  @Output() updateVibiioStatus = new EventEmitter<any>();
  @Output() toggleFullscreen = new EventEmitter<boolean>();

  constructor(private activatedRoute: ActivatedRoute,
              private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
              private statusUpdateService: VibiioUpdateService,
              private videoService: VideoChatService,
              private snapshotService: VideoSnapshotService,
              private activityService: ActivityService,
              private availabilitySharedService: AvailabilitySharedService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe( (data) => {
      this.vibiio = data.vibiio.vibiio;
    });
    this.session = this.videoService.initSession('1_MX40NTk5OTUyMn5-MTUyNDU4MDk2NDIxMn56S2djN21jYXpXdVRRZlcrOTJvREdLOFl-QX4');
    this.getToken();
  }

  callConsumer() {
    this.videoService.callConsumer(this.vibiio.id).subscribe(
        () => {
            this.getToken();
        }
    );
  }

  getToken() {
    this.vibiioConnecting = true;
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
        this.subscriber = this.session.subscribe(data.stream, 'subscriber-stream', VIDEO_OPTIONS,
        (stats) => {
            // wait till subscriber is set
            this.captureSnapshot();
    });
        this.networkDisconnected = false;
        this.onVibiio = true;
    });
}

private subscribeToStreamDestroyedEvents() {
    this.session.on('streamDestroyed', (data) => {
        this.onVibiio = false;
        this.availabilitySharedService.emitChange(true);
        this.session.disconnect();

        if (data.reason === 'networkDisconnected') {
            data.preventDefault();
            const subscribers = this.session.getSubscribersForStream(data.stream);
            if (subscribers.length > 0) {
                // Display error message inside the Subscriber
                this.networkDisconnected = true;
                data.preventDefault();   // Prevent the Subscriber from being removed
            }
        }
    });
}

// save snapshot
async captureSnapshot() {
    // wait for image data
    this.imgData = await this.subscriber.getImgData();
    this.snapshotService.saveSnapshot(this.vibiio.consumer_id, this.session.id, this.vibiio.id, this.imgData)
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

endSession() {
    this.session.disconnect();
    this.triggerActivity(
        this.vibiio.id,
        'Vibiiographer manually ended video session',
        'Video session ended'
    );
    this.availabilitySharedService.emitChange(true);
    this.vibiioConnecting = false;
    this.onVibiio = false;
}

  updateStatus(status: any) {
    this.updateVibiioStatus.emit(status);
  }

  toggleVibiioFullscreen() {
    this.toggleFullscreen.emit(true);
  }
}
