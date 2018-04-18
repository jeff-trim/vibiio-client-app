import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import * as screenfull from 'screenfull';

// Services
import { VibiioProfileService } from '../../services/vibiio-profile.service';

// Interfaces
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { VideoSnapshot } from '../../models/video-snapshot.interface';
import { Note } from '../../models/consumer-note.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { InsuranceStatusService } from '../../services/insurance-status.service';
import { ISubscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { VibiioProfileFormStatusService } from '../../services/vibiio-profile-form-status.service';
import { ConsumerUpdateService } from '../../services/consumer-update.service';
import { ConsumerProfileComponent } from '../../components/consumer-profile/consumer-profile.component';
import { Contact } from '../../models/contact.interface';
import { VibiioUpdateService } from '../../services/vibiio-update.service';
import { SidebarCustomerStatusSharedService } from '../../services/sidebar-customer-status-shared.service';
import { VideoChatService } from '../../services/video-chat.service';
import { Profile } from '../../../../../../vibiio-admin-client/src/app/models/profile.interface';
import { ActivityService } from '../../services/activity.service';
import { AvailabilitySharedService } from '../../services/availability-shared.service';
import { VideoSnapshotService } from '../../services/video-snapshot.service';
import { VIDEO_OPTIONS } from '../../../constants/video-options';
import { OPENTOK_API_KEY } from '../../../../environments/environment';

declare var OT: any; // for dev only. Comment out before merge/push

@Component({
    selector: 'vib-vibiio-profile',
    templateUrl: 'vibiio-profile.component.html',
    styleUrls: ['vibiio-profile.component.scss']
})

export class VibiioProfileComponent implements OnInit {
    onVibiio = false;
    vibiioConnecting = false;
    token: string;
    publisher: any;
    subscriber: any;
    imgData: any;
    session: any;
    consumer_id: number;
    consumerProfile: ConsumerProfile;
    vibiio: ConsumerProfile;
    vibiioFullscreen: boolean;
    networkDisconnected: boolean;
    notes: Note[];
    contacts: Contact[];
    vibiioId: number;
    description: string;
    isEditing = false;
    isUpdating = false;

    @ViewChild(ConsumerProfileComponent) consumerProfileChild: ConsumerProfileComponent;

    constructor(private activatedRoute: ActivatedRoute,
                private vibiioProfileService: VibiioProfileService,
                private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
                private formStatusService: VibiioProfileFormStatusService,
                private statusUpdateService: VibiioUpdateService,
                private videoService: VideoChatService,
                private snapshotService: VideoSnapshotService,
                private activityService: ActivityService,
                private availabilitySharedService: AvailabilitySharedService) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe( (data) => {
            this.consumerProfile = data.profile.vibiio;
            this.vibiioId = this.consumerProfile.id;
            this.notes = data.profile.vibiio.notes;
            this.description = data.profile.vibiio.description;
            this.contacts = data.profile.vibiio.contacts;
            this.vibiio = data.profile.vibiio;
            this.session = OT.initSession(OPENTOK_API_KEY, '1_MX40NTk5OTUyMn5-MTUyNDA2NjI5Nzk3Mn5IdGNTbjlUb21KWkFsOXBqZENxb2ZtUnJ-fg');
            console.log(this.session);
        });
    }

    updateNotes(consumerProfileId) {
        this.vibiioProfileService.getVibiio(consumerProfileId).subscribe( (data) => {
            this.notes = data.vibiio.notes;
        });
    }

    onFormEdit(event) {
        this.isEditing = event;
    }

    onFormUpdate() {
        this.isUpdating = true;
        this.formStatusService.onFormUpdate();
        this.consumerProfileChild.updateAddress();
        this.isEditing = false;
    }

    onCancel() {
        this.formStatusService.onCancel();
        this.consumerProfileChild.refreshAddress();
        this.isEditing = false;
        this.isUpdating = false;
    }

    connect() {

    }

    disconnect() {

    }
    updateStatus(statusUpdate: any) {
        const options = { status: statusUpdate.status };
        this.statusUpdateService
          .updateVibiio(options, statusUpdate.vibiioId)
          .subscribe( (data) => {
              console.log(data);
              this.vibiio = data.vibiio;
              this.sidebarCustomerStatusSharedService.emitChange(data);
          }, (error: any) => {
              console.log('error updating claim status');
          });
    }

    toggleVibiioFullscreen() {
        this.vibiioFullscreen = !this.vibiioFullscreen;
        if (screenfull.enabled) {
          screenfull.toggle();
        }
    }

    getToken() {
        this.vibiioConnecting = true;
        this.onVibiio = true;
        this.videoService.getToken(this.vibiio.id).subscribe((data) => {
            console.log(data);
            this.token = data.video_chat_auth_token.token;
            this.connectToSession();
        });
    }

    // private async connectToSession() {
    //     this.triggerActivity(this.vibiio.id,
    //         'Vibiiograher manually started video',
    //         'Video session started');

    //     this.session.connect(this.token, () => {
    //         console.log('connecting');
    //         this.publisher = this.initPublisher();
    //         console.log(this.publisher);
    //         this.hideVibiiographerVideo();
    //         this.subscribeToStreamCreatedEvents();
    //         this.subscribeToStreamDestroyedEvents();
    //     });
    // }

    private initPublisher() {
        return this.videoService.initPublisher();
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
                this.updateStatus({status: 'claim_in_progress'});
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
        this.snapshotService.saveSnapshot(this.consumer_id, this.session.id, this.vibiio.id, this.imgData)
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
    }

    async connectToSession() {
        this.vibiioConnecting = true;
        this.videoService.getToken(this.vibiio.id).subscribe((data) => {
            this.token = data.video_chat_auth_token.token;
            // this.token ="T1==cGFydG5lcl9pZD00NTUwMDI5MiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9YWMzZWI4NzBlMDU4ZGNhMzNhY2MyMGRhODkxOTRhYzE1YjI2NGQ2ZTpzZXNzaW9uX2lkPTFfTVg0ME5UVXdNREk1TW41LU1UVXdNak01TVRJM01qa3pObjV3V21welZ6STRRbE5sVUUxVFoydG9NQzk2UVVoSFdXbC1mZyZjcmVhdGVfdGltZT0xNTAyMzkxMjcyJnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MDIzOTEyNzIuOTY0MzE1OTg4MzgwOTcmZXhwaXJlX3RpbWU9MTUwNDk4MzI3Mg==";
            this.triggerActivity(this.vibiio.id,
                'Vibiiograher manually started video',
                'Video session started');
                this.session.connect(this.token, (error) => {
                    // Video options - Append sets it as the child of the id below
                    const options = {
                        insertMode: 'append',
                        fitMode: 'contain',
                        width: '100%',
                        height: '100%'
                    };

                    // Initialize a publisher and publish the audio only stream to the session
                    this.publisher = OT.initPublisher({insertDefaultUI: false}, options);
                    this.session.publish(this.publisher).publishVideo(false);

                    // Subscribe to stream created events
                    this.session.on('streamCreated', (data) => {
                    this.vibiioConnecting = false;
                    this.subscriber = this.session.subscribe(data.stream, 'subscriber-stream', options,
                    (stats) => {
                        console.log('subscriber set');
                        
                        // wait till subscriber is set
                        this.captureSnapshot();
                        // this.updateVibiioStatus();
                });
                    this.networkDisconnected = false;
                    this.onVibiio = true;
                });

                // subscribe to stream destroyed events
                this.session.on('streamDestroyed', (data) => {
                    this.onVibiio = false;
                    this.availabilitySharedService.emitChange(true);
                    this.session.disconnect();
                    // this.router.navigateByUrl('/dashboard/vibiio-profile/' + this.vibiio.id);

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
            });
        });
    }
}
