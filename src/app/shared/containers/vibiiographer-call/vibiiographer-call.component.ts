import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as screenfull from 'screenfull';
import { VIDEO_OPTIONS } from '../../../constants/video-options';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { AngularDraggableDirective } from 'angular2-draggable';

// Models
import { Vibiio } from '../../../dashboard/models/vibiio.interface';

// Services
import { AvailabilitySharedService } from '../../services/availability-shared.service';
import { ActivityService } from '../../services/activity.service';
import { VideoSnapshotService } from '../../services/video-snapshot.service';
import { VideoChatService } from '../../services/video-chat.service';
import { VibiioUpdateService } from '../../services/vibiio-update.service';
import { SidebarCustomerStatusSharedService } from '../../services/sidebar-customer-status-shared.service';
import { EXPERT_VIDEO_OPTIONS } from '../../../constants/expert-video-options';
import { AddToCallService } from '../../services/add-to-call.service';

@Component({
    selector: 'vib-vibiiographer-call',
    templateUrl: './vibiiographer-call.component.html',
    styleUrls: ['./vibiiographer-call.component.scss']
})

export class VibiiographerCallComponent implements OnInit, OnDestroy {
    vibiioConnecting: boolean;
    onVibiio: boolean;
    vibiioFullscreen: boolean;
    networkDisconnected: boolean;
    token: string;
    publisher: any;
    subscriber: any;
    expert: any;
    imgData: any;
    session: any;
    streams: any[];
    alive = true;
    showControls = false;
    closeSearch = true;
    muted = false;

    @Input() vibiio: Vibiio;

    @Output() updateVibiioStatus = new EventEmitter<any>();

    constructor(private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
        private statusUpdateService: VibiioUpdateService,
        private videoService: VideoChatService,
        private snapshotService: VideoSnapshotService,
        private activityService: ActivityService,
        private availabilitySharedService: AvailabilitySharedService,
        private changeDetector: ChangeDetectorRef,
        private addToCall: AddToCallService) { }

    ngOnInit() {
        this.vibiioConnecting = true;
        // this.getToken();
        // this.session = this.videoService.initSession('1_MX40NTk5OTUyMn5-MTUyNTM3ODIyMzA5MX5pSHFiMlhRQWhCUjBmKzNHc2svdlVDaEF-QX4');
    }

    ngOnDestroy() {
        this.alive = false;
    }

    addExpert(event: any) {
        // this.
        // assign expert name
        // send text to expert
        // display name in video chat
        // connect
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
            this.detectSubscriberAudio();
        });
    }

    private initPublisher() {
        this.publisher = this.videoService.initPublisher();
    }

    private hideVibiiographerVideo() {
        this.session.publish(this.publisher).publishVideo(false);
    }

    subscribeToStreamCreatedEvents() {
        this.changeDetector.detectChanges();
        this.session.on('streamCreated', (data) => {
            // if it's the first stream create a chat, else subscribe to audio
            this.streams.push(data.stream);
            console.log('streams', this.streams.length);
            if (!this.subscriber) {
                this.subscriber = this.session.subscribe(data.stream, 'subscriber-stream', VIDEO_OPTIONS,
                (stats) => {
                        // wait till subscriber is set
                        this.captureSnapshot();
                        this.vibiioConnecting = false;
                        this.showControls = true;
                    });
            this.onVibiio = true;
            this.networkDisconnected = false;
            this.changeDetector.detectChanges();
            }
        });
    }

    subscribeToStreamDestroyedEvents() {
        this.session.on('streamDestroyed', (data) => {
            // if it's the first stteam
            const idx = this.streams.indexOf(data.stream);
            if (idx > -1) {
                this.streams.splice(idx, 1);
                this.changeDetector.detectChanges();
            }

            if (this.streams.length === 1) {
                this.onVibiio = false;
                this.showControls = false;
                this.changeDetector.detectChanges();
                this.availabilitySharedService.emitChange(true);
                this.session.disconnect();
            }
            // else continue session
            // if (data.reason === 'networkDisconnected') {
            //     data.preventDefault();
            //     const subscribers = this.session.getSubscribersForStream(data.stream);
            //     if (subscribers.length > 0) {
            //         // Display error message inside the Subscriber
            //         this.networkDisconnected = true;
            //         this.changeDetector.detectChanges();
            //         data.preventDefault();   // Prevent the Subscriber from being removed
            //     }
            // }
        });
    }

    detectSubscriberAudio() {
        this.subscriber.on('audioLevelUpdated', (data) => {
            const now = Date.now();
            let activity;
            if (data.audioLevel > 0.2) {
                if (!activity) {
                    activity = {timestamp: now, talking: false};
                } else if (activity.talking) {
                    activity.timestamp = now;
                } else if (now - activity.timestamp > 1000) {
                    // detected audio activity for more than 1s
                    // for the first time.
                    activity.talking = true;
                    this.startTalking();
                }
            } else if (activity && now - activity.timestamp > 3000) {
                // detected low audio activity for more than 3s
                if (activity.talking) {
                    this.stopTalking();
                }
                activity = null;
            }
        });
    }

    startTalking() {
        console.log('talking');
    }

    stopTalking() {
        console.log('silence');
    }

    // save snapshot
    async captureSnapshot() {
        // wait for image data
        this.imgData = await this.subscriber.getImgData();
        this.snapshotService.saveSnapshot(this.vibiio.consumer_id, this.session.id, this.vibiio.id, this.imgData)
            .subscribe((data) => { },
                (error) => {
                    console.log('error ', error);
                });
    }

    private triggerActivity(vibiio_id: number, message: string, name: string) {
        this.activityService.postActivity(
            vibiio_id,
            message,
            name
        ).subscribe((data) => { });
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
        this.showControls = false;
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

    toggleSearch() {
        this.closeSearch = !this.closeSearch;
        if (!this.closeSearch) {
            this.showControls = false;
        } else {
            this.showControls = true;
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        if (this.muted) {
            this.publisher.setAudioVolume(0);
        } else {
            this.publisher.setAudioVolume(100);
        }
        console.log('toggle mute');
    }
}
