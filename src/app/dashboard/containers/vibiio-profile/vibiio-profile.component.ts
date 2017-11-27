import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

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

@Component({
    selector: 'vib-vibiio-profile',
    templateUrl: 'vibiio-profile.component.html',
    styleUrls: ['vibiio-profile.component.scss']
})

export class VibiioProfileComponent implements OnInit, OnDestroy {
    consumerProfile: ConsumerProfile;
    notes: Note[];
    vibiioId: number;
    description: string;
    isEditing = false;
    isUpdating = false;
    alive = true;

    @ViewChild(ConsumerProfileComponent) consumerProfileChild: ConsumerProfileComponent;

    constructor(private activatedRoute: ActivatedRoute,
                private vibiioProfileService: VibiioProfileService,
                private formStatusService: VibiioProfileFormStatusService) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe( (data) => {
            this.consumerProfile = data.profile.vibiio;
            this.vibiioId = this.consumerProfile.id;
            this.notes = data.profile.vibiio.notes;
            this.description = data.profile.vibiio.description;
        });
    }

    ngOnDestroy() {
        this.alive = false;
    }

    updateNotes(consumerProfileId) {
        this.vibiioProfileService.getVibiio(consumerProfileId).subscribe( (data) => {
            this.notes = data.vibiio.notes;
        });
    }

    onFormEdit() {
        this.formStatusService.onFormEdit();
        this.isEditing = true;
    }

    onFormUpdate() {
        this.formStatusService.onFormUpdate();
        this.isUpdating = true;
        this.consumerProfileChild.updateAddress();
    }

    onCancel() {
        this.formStatusService.onCancel();
        this.consumerProfileChild.refreshAddress();
        this.isEditing = false;
        this.isUpdating = false;
    }
}
