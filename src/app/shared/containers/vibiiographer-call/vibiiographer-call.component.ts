import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as screenfull from 'screenfull';
import { VIDEO_OPTIONS } from '../../../constants/video-options';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { AngularDraggableDirective } from 'angular2-draggable';

// Models
import { Vibiio } from '../../../dashboard/models/vibiio.interface';
import { User } from '../../../dashboard/models/user.interface';

// Services
import { AvailabilitySharedService } from '../../services/availability-shared.service';
import { ActivityService } from '../../services/activity.service';
import { VideoSnapshotService } from '../../services/video-snapshot.service';
import { VideoChatService } from '../../services/video-chat.service';
import { VibiioUpdateService } from '../../services/vibiio-update.service';
import { SidebarCustomerStatusSharedService } from '../../services/sidebar-customer-status-shared.service';
import { EXPERT_VIDEO_OPTIONS } from '../../../constants/expert-video-options';
import { AddToCallService } from '../../services/add-to-call.service';
import { VibiioProfileService } from '../../../dashboard/services/vibiio-profile.service';

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
    showControls = true;
    closeSearch = true;
    muted = false;
    enableFullscreen = false;
    consumerName: string;
    expertName: string;

    @Input() vibiio: Vibiio;
    @Input() outgoingCall = true;

    @Output() updateVibiioStatus = new EventEmitter<any>();

    constructor(private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
        private statusUpdateService: VibiioUpdateService,
        private videoService: VideoChatService,
        private snapshotService: VideoSnapshotService,
        private activityService: ActivityService,
        private availabilitySharedService: AvailabilitySharedService,
        private changeDetector: ChangeDetectorRef,
        private addToCall: AddToCallService,
        private vibiioProfileService: VibiioProfileService) { }

    ngOnInit() {
        this.vibiioConnecting = true;
        this.getToken();
        this.session = this.videoService.initSession(this.vibiio.video_session_id);
        this.consumerName = this.vibiio.consumer_name;
        if (this.outgoingCall) {
            this.callConsumer();
        }
    }

    ngOnDestroy() {
        this.alive = false;
    }

    addExpert(expert: User) {
        this.addToCall.callUser(expert.id, this.vibiio.id).subscribe( (data) => {
            this.consumerName = data.consumer;
            this.expertName = data.expert;
        });
    }

    getToken() {
        this.videoService.getToken(this.vibiio.id).subscribe((data) => {
            this.token = data.video_chat_auth_token.token;
            this.connectToSession();
        });
    }

    callConsumer() {
        this.videoService.dialConsumer(this.vibiio.id).subscribe( (res) => {});
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
        this.showControls = true;
        this.changeDetector.detectChanges();
        this.session.on('streamCreated', (data) => {
            this.vibiioConnecting = false;
            this.subscriber = this.session.subscribe(data.stream, 'subscriber-stream', VIDEO_OPTIONS,
                (stats) => {
                    this.captureSnapshot();
                });
            this.onVibiio = true;
            this.networkDisconnected = false;
            this.changeDetector.detectChanges();
        });
    }

    subscribeToStreamDestroyedEvents() {
        this.session.on('streamDestroyed', (data) => {
            this.session.disconnect();
            this.videoService.hangUp(this.vibiio);
            this.availabilitySharedService.emitChange(true);

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
        this.videoService.hangUp(this.vibiio);
        this.availabilitySharedService.emitChange(true);

        this.triggerActivity(
            this.vibiio.id,
            'Vibiiographer manually ended video session',
            'Video session ended'
        );
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
            this.publisher.publishAudio(false);
        } else {
            this.publisher.publishAudio(true);
        }
    }
}
