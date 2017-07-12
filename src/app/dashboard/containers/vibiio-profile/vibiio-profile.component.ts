import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

// Services
import { VibiioProfileService } from '../../services/vibiio-profile.service';

// Interfaces
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { VideoSnapshot } from '../../models/video-snapshot.interface';


@Component({
    selector: 'vibiio-profile',
    templateUrl: 'vibiio-profile.component.html'
})

export class VibiioProfileComponent implements OnInit {
    consumerProfile: ConsumerProfile;

    constructor(private activatedRoute: ActivatedRoute,
                private vibiioProfileService: VibiioProfileService) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe( (data) => {
        console.log(data);
        this.consumerProfile = data.profile.vibiio;
        console.log(this.consumerProfile);
 });
    }
}
