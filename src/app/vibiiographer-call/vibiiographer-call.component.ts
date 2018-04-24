import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as screenfull from 'screenfull';
import { VIDEO_OPTIONS } from '../constants/video-options';

// Models
import { Vibiio } from '../dashboard/models/vibiio.interface';

// Services
import { AvailabilitySharedService } from '../shared/services/availability-shared.service';
import { ActivityService } from '../shared/services/activity.service';
import { VideoSnapshotService } from '../shared/services/video-snapshot.service';
import { VideoChatService } from '../shared/services/video-chat.service';
import { VibiioUpdateService } from '../shared/services/vibiio-update.service';
import { SidebarCustomerStatusSharedService } from '../shared/services/sidebar-customer-status-shared.service';

@Component({
  selector: 'vib-vibiiographer-call',
  templateUrl: './vibiiographer-call.component.html',
  styleUrls: ['./vibiiographer-call.component.scss']
})

export class VibiiographerCallComponent implements OnInit {
  vibiio: Vibiio;
  vibiioConnecting: boolean;
  onVibiio: boolean;
  vibiioFullscreen: boolean;
  networkDisconnected: boolean;
  token: string;
  publisher: any;
  subscriber: any;
  imgData: any;
  session: any;

  @Output() updateVibiioStatus = new EventEmitter<any>();

  constructor(private activatedRoute: ActivatedRoute,
              private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
              private statusUpdateService: VibiioUpdateService,
              private videoService: VideoChatService,
              private snapshotService: VideoSnapshotService,
              private activityService: ActivityService,
              private availabilitySharedService: AvailabilitySharedService,
              private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.vibiioConnecting = false;
    this.activatedRoute.data.subscribe( (data) => {
      this.vibiio = data.vibiio.vibiio;
    });
    this.session = this.videoService.initSession('2_MX40NTk5OTUyMn5-MTUyNDU5NTM3OTgxN35EQ0FSa2w4clFKYVdmeDRvNEFZcVBKSEd-QX4');
    this.getToken();
  }

  getToken() {
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

subscribeToStreamCreatedEvents() {
    this.vibiioConnecting = true;
    this.changeDetector.detectChanges();
    this.session.on('streamCreated', (data) => {
        this.subscriber = this.session.subscribe(data.stream, 'subscriber-stream', VIDEO_OPTIONS,
        (stats) => {
            // wait till subscriber is set
            this.captureSnapshot();
        });
        this.onVibiio = true;
        this.networkDisconnected = false;
        this.changeDetector.detectChanges();
    });
}

subscribeToStreamDestroyedEvents() {
    this.session.on('streamDestroyed', (data) => {
        this.onVibiio = false;
        this.changeDetector.detectChanges();
        this.availabilitySharedService.emitChange(true);
        this.session.disconnect();

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
    this.onVibiio = false;
    this.vibiioConnecting = false;
    this.changeDetector.detectChanges();
}

  updateStatus(status: any) {
    this.updateVibiioStatus.emit(status);
  }

  toggleVibiioFullscreen() {
    this.vibiioFullscreen = !this.vibiioFullscreen;
    this.changeDetector.detectChanges();
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }
}
