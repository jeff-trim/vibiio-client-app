import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import * as screenfull from 'screenfull';
import { ISubscription } from 'rxjs/Subscription';

// Components
import { ConsumerProfileComponent } from '../../components/consumer-profile/consumer-profile.component';

// Services
import { VibiioProfileService } from '../../services/vibiio-profile.service';
import { InsuranceStatusService } from '../../services/insurance-status.service';
import { VibiioProfileFormStatusService } from '../../services/vibiio-profile-form-status.service';
import { ConsumerUpdateService } from '../../services/consumer-update.service';
import { WindowRefService } from '../../../shared/services/window-ref.service';
import { AvailabilitySharedService } from '../../../shared/services/availability-shared.service';
import { ActivityService } from '../../../shared/services/activity.service';
import { VibiioUpdateService } from '../../../shared/services/vibiio-update.service';
import { SidebarCustomerStatusSharedService } from '../../../shared/services/sidebar-customer-status-shared.service';

// Interfaces
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { Note } from '../../models/consumer-note.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { Contact } from '../../models/contact.interface';

@Component({
    selector: 'vib-vibiio-profile',
    templateUrl: 'vibiio-profile.component.html',
    styleUrls: ['vibiio-profile.component.scss']
})

export class VibiioProfileComponent implements OnInit {
    consumerProfile: ConsumerProfile;
    vibiio: ConsumerProfile;
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
        const url = `/vibiiographer-call/${this.vibiioId}/${this.consumerProfile.consumer_id}`;
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
}
