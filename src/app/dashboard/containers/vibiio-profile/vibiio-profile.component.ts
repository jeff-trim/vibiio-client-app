import { Component, OnInit, Input } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

// Services
import { VibiioProfileService } from '../../services/vibiio-profile.service';

// Interfaces
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { VideoSnapshot } from '../../models/video-snapshot.interface';
import { Note } from '../../models/consumer-note.interface';
import { Vibiio } from '../../models/vibiio.interface';

@Component({
    selector: 'vibiio-profile',
    templateUrl: 'vibiio-profile.component.html',
    styleUrls: ['vibiio-profile.component.scss']
})

export class VibiioProfileComponent implements OnInit {
    consumerProfile: ConsumerProfile;
    notes: Note[];
    vibiioId: number;
    description: string;

    constructor(private activatedRoute: ActivatedRoute,
                private vibiioProfileService: VibiioProfileService) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe( (data) => {
            this.consumerProfile = data.profile.vibiio;
            this.vibiioId = this.consumerProfile.id;
            this.notes = data.profile.vibiio.notes;
            this.description = data.profile.vibiio.description;
        });
        console.log(this.consumerProfile);
    }

    updateNotes(consumerProfile_id) {
        this.vibiioProfileService.getVibiio(consumerProfile_id).subscribe( (data) => {
            console.log('here', data);
            this.notes = data.vibiio.notes;
        });
    }
}
