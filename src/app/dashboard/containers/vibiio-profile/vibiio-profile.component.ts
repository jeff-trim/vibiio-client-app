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

@Component({
    selector: 'vib-vibiio-profile',
    templateUrl: 'vibiio-profile.component.html',
    styleUrls: ['vibiio-profile.component.scss']
})

export class VibiioProfileComponent implements OnInit {
    consumerProfile: ConsumerProfile;
    notes: Note[];
    vibiioId: number;
    description: string;
    isEditingInsurance = false;
    isUpdatingInsurance = false;


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

        this.insuranceStatusService.onEdit$.subscribe( (data) => {
            this.isEditingInsurance = Object.assign({}, this.isEditingInsurance, data);
        });

        this.insuranceStatusService.onUpdate$.subscribe( (data) => {
            this.isUpdatingInsurance = Object.assign({}, this.isUpdatingInsurance, data);
        });
    }

    updateNotes(consumerProfileId) {
        this.vibiioProfileService.getVibiio(consumerProfileId).subscribe( (data) => {
            this.notes = data.vibiio.notes;
        });
    }

    onPolicyEdit() {
        this.isEditingInsurance = Object.assign({}, this.isEditingInsurance, true);
    }

    onPolicyUpdate() {
        this.isUpdatingInsurance = Object.assign({}, this.isUpdatingInsurance, true);
    }
}
