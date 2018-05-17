import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import * as screenfull from 'screenfull';

// Components
import { ConsumerProfileComponent } from '../../components/consumer-profile/consumer-profile.component';

// Services
import { VibiioProfileService } from '../../services/vibiio-profile.service';
import { VibiioProfileFormStatusService } from '../../services/vibiio-profile-form-status.service';
import { AvailabilitySharedService } from '../../../shared/services/availability-shared.service';
import { ActivityService } from '../../../shared/services/activity.service';
import { VibiioUpdateService } from '../../../shared/services/vibiio-update.service';
import { SidebarCustomerStatusSharedService } from '../../../shared/services/sidebar-customer-status-shared.service';

// Interfaces
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { Note } from '../../models/consumer-note.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { Contact } from '../../models/contact.interface';
import { VideoChatService } from '../../../shared/services/video-chat.service';

@Component({
    selector: 'vib-vibiio-profile',
    templateUrl: 'vibiio-profile.component.html',
    styleUrls: ['vibiio-profile.component.scss']
})

export class VibiioProfileComponent implements OnInit, OnDestroy {
    consumerProfile: ConsumerProfile;
    vibiio: ConsumerProfile;
    notes: Note[];
    contacts: Contact[];
    vibiioId: number;
    description: string;
    isEditing = false;
    isUpdating = false;
    onVibiio = false;
    alive: boolean;

    @ViewChild(ConsumerProfileComponent) consumerProfileChild: ConsumerProfileComponent;

    constructor(private activatedRoute: ActivatedRoute,
                private vibiioProfileService: VibiioProfileService,
                private videoChatService: VideoChatService,
                private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
                private formStatusService: VibiioProfileFormStatusService,
                private statusUpdateService: VibiioUpdateService,
                private activityService: ActivityService,
                private availabilitySharedService: AvailabilitySharedService) { }

    ngOnInit() {
        this.alive = true;
        this.activatedRoute.data.subscribe( (data) => {
            this.consumerProfile = data.profile.vibiio;
            this.vibiioId = this.consumerProfile.id;
            this.notes = data.profile.vibiio.notes;
            this.description = data.profile.vibiio.description;
            this.contacts = data.profile.vibiio.contacts;
            this.vibiio = data.profile.vibiio;
        });
        this.subscribeToEndCall();
    }

    ngOnDestroy() {
        this.alive = false;
    }

    startCall() {
        this.videoChatService.call(this.vibiio, true);
        this.onVibiio = true;
    }

    subscribeToEndCall() {
        this.videoChatService.hangingUp$
          .takeWhile(() => this.alive)
          .subscribe( (vibiio) => {
            this.onVibiio = false;
            this.refreshProfile();
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

    refreshProfile() {
        this.vibiioProfileService
            .getVibiio(this.vibiio.id)
            .subscribe( (data) => {
                this.consumerProfile = data.vibiio;
        });
    }
}
