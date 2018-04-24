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
import { WindowRefService } from '../../services/window-ref.service';

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
    nativeWindow: any;

    @ViewChild(ConsumerProfileComponent) consumerProfileChild: ConsumerProfileComponent;

    constructor(private activatedRoute: ActivatedRoute,
                private vibiioProfileService: VibiioProfileService,
                private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
                private formStatusService: VibiioProfileFormStatusService,
                private statusUpdateService: VibiioUpdateService,
                private videoService: VideoChatService,
                private snapshotService: VideoSnapshotService,
                private activityService: ActivityService,
                private availabilitySharedService: AvailabilitySharedService,
                private winRef: WindowRefService ) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe( (data) => {
            this.consumerProfile = data.profile.vibiio;
            this.vibiioId = this.consumerProfile.id;
            this.notes = data.profile.vibiio.notes;
            this.description = data.profile.vibiio.description;
            this.contacts = data.profile.vibiio.contacts;
            this.vibiio = data.profile.vibiio;
            // this.session = this.videoService.initSession("1_MX40NTk5OTUyMn5-MTUyNDE3MjM2OTYyOX5jTHJBWEJ2WkhPS1ROSnA2ZXg1K2VoWEt-QX4");
            this.nativeWindow = this.winRef.getNativeWindow();
        });
    }

    startCall() {
        const url = `/dashboard/vibiiographer-call/${this.vibiioId}/${this.consumerProfile.consumer_id}`;
        const strWindowFeatures = `left=20,top=20,titlebar=no,menubar=no,/
                                   location=no,resizable=yes,scrollbars=no,/
                                   status=no,height=500,width=375`;
        const callWindow = this.nativeWindow.open(url, '_blank', `${strWindowFeatures}`);
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

    updateStatus(statusUpdate: any) {
        const options = { status: statusUpdate.status };
        this.statusUpdateService
          .updateVibiio(options, statusUpdate.vibiioId)
          .subscribe( (data) => {
              this.vibiio = data.vibiio;
              this.sidebarCustomerStatusSharedService.emitChange(data);
          }, (error: any) => {
              console.log('error updating claim status');
          });
    }

    // toggleVibiioFullscreen() {
    //     this.vibiioFullscreen = !this.vibiioFullscreen;
    //     if (screenfull.enabled) {
    //       screenfull.toggle();
    //     }
    // }

    // getToken() {
    //     this.vibiioConnecting = true;
    //     this.videoService.getToken(this.vibiio.id).subscribe((data) => {
    //         this.token = data.video_chat_auth_token.token;
    //         this.connectToSession();
    //     });
    // }

    // private connectToSession() {
    //     this.triggerActivity(this.vibiio.id,
    //         'Vibiiograher manually started video',
    //         'Video session started');

    //     this.session.connect(this.token, () => {
    //         this.initPublisher();
    //         this.hideVibiiographerVideo();
    //         this.subscribeToStreamCreatedEvents();
    //         this.subscribeToStreamDestroyedEvents();
    //     });
    // }

    // private initPublisher() {
    //     this.publisher = this.videoService.initPublisher();
    // }

    // private hideVibiiographerVideo() {
    //     this.session.publish(this.publisher).publishVideo(false);
    // }

    // private subscribeToStreamCreatedEvents() {
    //      this.session.on('streamCreated', (data) => {
    //         this.vibiioConnecting = false;
    //         this.subscriber = this.session.subscribe(data.stream, 'subscriber-stream', VIDEO_OPTIONS,
    //         (stats) => {
    //             // wait till subscriber is set
    //             this.captureSnapshot();
    //     });
    //         this.networkDisconnected = false;
    //         this.onVibiio = true;
    //     });
    // }

    // private subscribeToStreamDestroyedEvents() {
    //     this.session.on('streamDestroyed', (data) => {
    //         this.onVibiio = false;
    //         this.availabilitySharedService.emitChange(true);
    //         this.session.disconnect();

    //         if (data.reason === 'networkDisconnected') {
    //             data.preventDefault();
    //             const subscribers = this.session.getSubscribersForStream(data.stream);
    //             if (subscribers.length > 0) {
    //                 // Display error message inside the Subscriber
    //                 this.networkDisconnected = true;
    //                 data.preventDefault();   // Prevent the Subscriber from being removed
    //             }
    //         }
    //     });
    // }

//     // save snapshot
//     async captureSnapshot() {
//         // wait for image data
//         this.imgData = await this.subscriber.getImgData();
//         this.snapshotService.saveSnapshot(this.consumer_id, this.session.id, this.vibiio.id, this.imgData)
//             .subscribe( (data) => {},
//                 (error) => {
//                     console.log('error ', error);
//             });
//     }

//   private triggerActivity(vibiio_id: number, message: string, name: string) {
//         this.activityService.postActivity(
//             vibiio_id,
//             message,
//             name
//             ).subscribe((data) => {});
//     }

    // endSession() {
    //     this.session.disconnect();
    //     this.triggerActivity(
    //         this.vibiio.id,
    //         'Vibiiographer manually ended video session',
    //         'Video session ended'
    //     );
    //     this.availabilitySharedService.emitChange(true);
    //     this.vibiioConnecting = false;
    //     this.onVibiio = false;
    // }

    // callConsumer() {
    //     this.videoService.callConsumer(this.vibiioId).subscribe(
    //         () => {
    //             this.getToken();
    //         }
    //     );
    // }
}
