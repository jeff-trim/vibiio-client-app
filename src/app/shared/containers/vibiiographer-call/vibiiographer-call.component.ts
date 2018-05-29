import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import * as screenfull from 'screenfull';

// Components
import { VideoChatComponent } from '../../components/video-chat/video-chat.component';

// Models
import { Vibiio } from '../../../dashboard/models/vibiio.interface';
import { User } from '../../../dashboard/models/user.interface';
import { VIDEO_OPTIONS } from '../../../constants/video-options';

// Services
import { VibiioProfileService } from '../../../dashboard/services/vibiio-profile.service';
import { ActivityService } from '../../services/activity.service';
import { AddToCallService } from '../../services/add-to-call.service';
import { AvailabilitySharedService } from '../../services/availability-shared.service';
import { SidebarCustomerStatusSharedService } from '../../services/sidebar-customer-status-shared.service';
import { VibiioUpdateService } from '../../services/vibiio-update.service';
import { VideoChatService } from '../../services/video-chat.service';
import { VideoSnapshotService } from '../../services/video-snapshot.service';



@Component({
    selector: 'vib-vibiiographer-call',
    templateUrl: './vibiiographer-call.component.html',
    styleUrls: ['./vibiiographer-call.component.scss'],
    animations: [
        trigger('slideUpDown', [
            transition(':enter', [
                style({ transform: 'translateY(100%)' }),
                animate('600ms cubic-bezier(0.64, 0.04, 0.35, 1)')
            ]),
            transition(':leave', [
                style({ transform: 'translateY(0)', height: '*' }),
                animate(600, style({ transform: 'translateY(100%)', height: '0' }))
            ]),
        ]),
        trigger('expandableState', [
            transition(':enter', [
                style({ transform: 'translateY(100%)', height: '0%' }),
                animate('600ms cubic-bezier(0.64, 0.04, 0.35, 1)',
                    style({ transform: 'translateY(0%)', height: '*' })),
            ]),
            transition(':leave', [
                style({ transform: 'translateY(0%)', height: '*' }),
                animate('600ms cubic-bezier(0.64, 0.04, 0.35, 1)',
                    style({ transform: 'translateY(100%)', height: '0%' })),
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
    expertToAdd: string;
    state: string;
    stateExpression = 'collapsed';
    chime = new Audio('/assets/audio/chime.mp3');

    @Input() vibiio: Vibiio;
    @Input() outgoingCall = true;

    @Output() updateVibiioStatus = new EventEmitter<any>();

    @ViewChild(VideoChatComponent) videoChatComponent: VideoChatComponent;


    constructor(private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
        private videoService: VideoChatService,
        private statusUpdateService: VibiioUpdateService,
        private snapshotService: VideoSnapshotService,
        private activityService: ActivityService,
        private availabilitySharedService: AvailabilitySharedService,
        private addToCall: AddToCallService,
        private vibiioProfileService: VibiioProfileService) { }

            // handle escape when vibiio is Fullscreen
    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        const x = event.keyCode;
        if ((x === 27) && this.vibiioFullscreen) {
            this.toggleVibiioFullscreen();
        }
    }

    ngOnInit() {
        console.log('call', this.vibiio);
        this.vibiioConnecting = true;
        this.startSession();
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
        this.addToCall.callUser(expert.id, this.vibiio.id).subscribe((data) => {
            this.consumerName = data.consumer;
            this.expertToAdd = data.expert;
        });
    }

    startSession() {
        this.videoService.getConnectionData(this.vibiio.id, undefined, undefined)
            .subscribe((data) => {
                this.token = data.connection_data.token_data.token;
                this.connectToSession();
            });
    }

    callConsumer() {
        this.videoService.dialConsumer(this.vibiio.id).subscribe((res) => { });
    }

    subscribeToStreamCreatedEvents() {
        this.showControls = true;
        this.session.on('streamCreated', (data) => {
            this.vibiioConnecting = false;
            if (this.expertToAdd) { this.expertConnected(); }
            this.subscriber = this.session.subscribe(data.stream, 'subscriber-stream', VIDEO_OPTIONS,
                (stats) => {
                    this.captureSnapshot();
                });
            this.onVibiio = true;
        });
    }

    subscribeToStreamDestroyedEvents() {
        this.session.on('streamDestroyed', (data) => {
            this.stopPublishing();
            this.session.disconnect();
            this.availabilitySharedService.emitChange(true);
            this.videoService.hangUp(this.vibiio);
        });
    }

    stopPublishing() {
        if (this.subscriber) {
            this.session.unsubscribe(this.subscriber);
            this.subscriber.destroy();
        }
        if (this.publisher) {
            this.session.unpublish(this.publisher);
            this.publisher.destroy();
        }
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

    endSession() {
        this.stopPublishing();
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

    expertConnected() {
        this.expertName = this.expertToAdd;
        this.chime.play();
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

    private triggerActivity(vibiio_id: number, message: string, name: string) {
        this.activityService.postActivity(
            vibiio_id,
            message,
            name
        ).subscribe((data) => { });
    }
}
