import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as screenfull from 'screenfull';
import { VIDEO_OPTIONS } from '../../../constants/video-options';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { AngularDraggableDirective } from 'angular2-draggable';
import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';
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
import { VideoChatComponent } from '../../components/video-chat/video-chat.component';


@Component({
    selector: 'vib-vibiiographer-call',
    templateUrl: './vibiiographer-call.component.html',
    styleUrls: ['./vibiiographer-call.component.scss'],
    animations: [
        trigger('slideUpDown', [
            transition(':enter', [
                style({transform: 'translateY(100%)'}),
                animate('600ms cubic-bezier(0.64, 0.04, 0.35, 1)')
            ]),
            transition(':leave', [
                style({transform: 'translateY(0)', height: '*'}),
                animate(600, style({ transform: 'translateY(100%)', height: '0'}))
            ]),
        ]),
        trigger('expandableState', [
            transition(':enter', [
              style({ transform: 'translateY(100%)', height: '0%'}),
              animate('600ms cubic-bezier(0.64, 0.04, 0.35, 1)',
                style({ transform: 'translateY(0%)', height: '*'})),
            ]),
            transition(':leave', [
              style({ transform: 'translateY(0%)', height: '*' }),
              animate('600ms cubic-bezier(0.64, 0.04, 0.35, 1)',
                style({ transform: 'translateY(100%)', height: '0%'})),
            ]),
        ])
    ]
})

export class VibiiographerCallComponent implements OnInit, OnDestroy {
    vibiioConnecting: boolean;
    onVibiio: boolean;
    vibiioFullscreen: boolean;
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
    state: string;
    stateExpression = 'collapsed';

    @Input() vibiio: Vibiio;
    @Input() outgoingCall = true;

    @Output() updateVibiioStatus = new EventEmitter<any>();

    @ViewChild(VideoChatComponent) videoChatComponent: VideoChatComponent;

    constructor(private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
        private statusUpdateService: VibiioUpdateService,
        private videoService: VideoChatService,
        private snapshotService: VideoSnapshotService,
        private activityService: ActivityService,
        private availabilitySharedService: AvailabilitySharedService,
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

    expand() {
        this.stateExpression = 'expanded';
    }

    collapse() {
        this.stateExpression = 'collapsed';
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
        this.session.on('streamCreated', (data) => {
            this.vibiioConnecting = false;
            this.subscriber = this.session.subscribe(data.stream, 'subscriber-stream', VIDEO_OPTIONS,
                (stats) => {
                    this.captureSnapshot();
                });
            this.onVibiio = true;
        });
    }

    subscribeToStreamDestroyedEvents() {
        this.session.on('streamDestroyed', (data) => {
            this.session.disconnect();
            this.videoService.hangUp(this.vibiio);
            this.availabilitySharedService.emitChange(true);
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
        const el = document.getElementById('full');
        this.vibiioFullscreen = !this.vibiioFullscreen;
        if (screenfull.enabled) {
            screenfull.toggle(el);
        }
    }

    toggleSearch() {
        this.closeSearch = !this.closeSearch;
        if (!this.closeSearch) {
            this.showControls = false;
            this.expand();
        } else {
            this.showControls = true;
            this.collapse();
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
