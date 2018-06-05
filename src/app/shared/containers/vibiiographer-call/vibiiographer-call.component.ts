import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener,
    Input, OnInit, AfterContentInit, OnDestroy, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import * as screenfull from 'screenfull';

// Components
import { VideoChatComponent } from '../../components/video-chat/video-chat.component';

// Models
import { Vibiio } from '../../../dashboard/models/vibiio.interface';
import { User } from '../../../dashboard/models/user.interface';
import { VIDEO_OPTIONS } from '../../../constants/video-options';
import { OPENTOK_API_KEY } from '../../../../environments/environment';

// Services
import { VibiioProfileService } from '../../../dashboard/services/vibiio-profile.service';
import { ActivityService } from '../../services/activity.service';
import { AddToCallService } from '../../services/add-to-call.service';
import { AvailabilitySharedService } from '../../services/availability-shared.service';
import { SidebarCustomerStatusSharedService } from '../../services/sidebar-customer-status-shared.service';
import { VibiioUpdateService } from '../../services/vibiio-update.service';
import { VideoChatService } from '../../services/video-chat.service';
import { VideoSnapshotService } from '../../services/video-snapshot.service';
import { Observable } from 'rxjs/Rx';

declare var OT: any;

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

export class VibiiographerCallComponent implements OnInit, AfterContentInit, OnDestroy {
    vibiioConnecting: boolean;
    onVibiio: boolean;
    vibiioFullscreen: boolean;
    token: string;
    publisher: any;
    session: any;
    subscriber: any;
    expert: any;
    imgData: any;
    streams: any[];
    showControls= true;
    closeSearch = true;
    muted = false;
    alive: boolean;
    enableFullscreen = true;
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
        private vibiioProfileService: VibiioProfileService,
        private ref: ChangeDetectorRef) { }

    // handle escape when vibiio is Fullscreen
    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        const x = event.keyCode;
        if ((x === 27) && this.vibiioFullscreen) {
            this.toggleVibiioFullscreen();
        }
    }

    ngOnInit() {
        this.alive = true;
        this.vibiioConnecting = true;
        this.getConnectionData();
        this.consumerName = this.vibiio.consumer_name;
        if (this.outgoingCall) {
            this.callConsumer();
        }
    }

    ngAfterContentInit() {
        // this.getConnectionData();
        // this.session = OT.initSession(OPENTOK_API_KEY, this.vibiio.video_session_id);
        // this.consumerName = this.vibiio.consumer_name;
        // if (this.outgoingCall) {
        //     this.callConsumer();
        // }
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

    getConnectionData() {
        this.videoService.getConnectionData(this.vibiio.id, undefined, undefined)
            .takeWhile(() => this.alive)
            .subscribe((data) => {
                this.token = data.connection_data.token_data.token;
                this.connectToSession();
            });
    }


    private connectToSession() {
        this.session = OT.initSession(OPENTOK_API_KEY, this.vibiio.video_session_id);
        this.session.connect(this.token, () => {
            this.initPublisher();
            this.hideVibiiographerVideo();
            this.subscribeToStreamCreatedEvents();
            this.subscribeToStreamDestroyedEvents();
        });

        this.triggerActivity(this.vibiio.id,
            'Vibiiograher manually started video',
            'Video session started');
    }

    callConsumer() {
        this.videoService.dialConsumer(this.vibiio.id).subscribe((res) => { });
    }

    subscribeToStreamCreatedEvents() {
        this.vibiioConnecting = false;
        this.onVibiio = true;
        this.session.on('streamCreated', (data) => {
            // multiple archives fix
            let alreadySubscribed = false;
            const subscribers = this.session.getSubscribersForStream(data.stream);

            for (const subscriber of subscribers) {
                if (subscriber.stream.connection.connectionId === data.stream.connection.connectionId) {
                    alreadySubscribed = true;
                }
            }

            // if new connection
            if (!alreadySubscribed) {
                this.subscriber = this.session.subscribe(data.stream, 'subscriber-stream', VIDEO_OPTIONS,
                (stats) => {
                    console.log('initiating capture');
                    this.captureSnapshot();
                });
                this.streams.push(data.stream.connection.connectionId);

                if (this.expertToAdd) {
                    this.expertConnected();
                }
            }
        });
    }

    subscribeToStreamDestroyedEvents() {
        this.session.on('streamDestroyed', (data) => {
            const streamId = data.stream.connection.connectionId;
            this.removeStream(streamId);

            if (this.streams.length === 0) {
                this.stopPublishing();
            }
        });
    }

    removeStream(streamId: string) {
        const index: number = this.streams.indexOf(streamId);
        if (index !== -1) {
            this.streams.splice(index, 1);
        }
    }

    stopPublishing() {
        console.log('stop Publishing');
        if (this.subscriber) {
            this.session.unsubscribe(this.subscriber);
            this.subscriber.destroy();
        }
        if (this.publisher) {
            this.session.unpublish(this.publisher);
            this.publisher.destroy();
        }
        this.session.disconnect();
        this.videoService.hangUp();
    }

    captureSnapshot() {
        this.imgData = this.subscriber.getImgData();
        this.saveSnapshot();
    }

    saveSnapshot() {
        console.log('saving');
        this.snapshotService.saveSnapshot(this.vibiio.consumer_id, this.session.id, this.vibiio.id, this.imgData)
            .subscribe((data) => { console.log('save data', data);
            },
                (error) => {
                    console.log('error ', error);
        });
    }

    endSession() {
        this.stopPublishing();
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

    private initPublisher() {
        this.publisher = OT.initPublisher({insertDefaultUI: false}, VIDEO_OPTIONS);
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
