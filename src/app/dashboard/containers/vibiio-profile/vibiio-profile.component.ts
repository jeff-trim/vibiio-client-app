import { Component, OnInit, Input } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

// Services
import { VibiioProfileService } from '../../services/vibiio-profile.service';

// Interfaces
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { VideoSnapshot } from '../../models/video-snapshot.interface';
import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'vibiio-profile',
    templateUrl: 'vibiio-profile.component.html',
    styleUrls: ['vibiio-profile.component.scss']
})

export class VibiioProfileComponent implements OnInit {
    consumerProfile: ConsumerProfile;
    notes: Note[];

    constructor(private activatedRoute: ActivatedRoute,
                private vibiioProfileService: VibiioProfileService) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe( (data) => {
            this.consumerProfile = data.profile.vibiio;
            this.notes = data.profile.vibiio.notes;
        });
    }
}
