import { Component, OnInit, Input } from '@angular/core';
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
    isEditingInsurance = false;
    isUpdatingInsurance = false;
    alive = true;

    constructor(private activatedRoute: ActivatedRoute,
                private vibiioProfileService: VibiioProfileService,
                private insuranceStatusService: InsuranceStatusService) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe( (data) => {
            this.consumerProfile = data.profile.vibiio;
            this.vibiioId = this.consumerProfile.id;
            this.notes = data.profile.vibiio.notes;
            this.description = data.profile.vibiio.description;
        });

        this.insuranceStatusService.onEdit$
            .takeWhile(() => this.alive)
            .subscribe( (data) => {
                this.isEditingInsurance = data;
            });

        this.insuranceStatusService.onUpdate$
            .takeWhile(() => this.alive)
            .subscribe( (data) => {
                this.isUpdatingInsurance = data;
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

    onPolicyEdit() {
        this.isEditingInsurance = true;
        this.insuranceStatusService.editStatus(true);
    }

    onPolicyUpdate() {
        this.isUpdatingInsurance = true;
        this.insuranceStatusService.updateStatus(true);
    }

    onCancelPolicyEdit() {
        this.insuranceStatusService.cancelEdit(true);
        this.insuranceStatusService.updateStatus(false);
        this.insuranceStatusService.editStatus(false);
    }
}
