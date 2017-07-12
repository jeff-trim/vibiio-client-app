import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { ConsumerProfile } from '../../models/consumer-profile.interface';

@Component({
    selector: 'consumer-profile-title',
    templateUrl: 'consumer-profile-title.component.html',
    styleUrls: ['consumer-profile-title.component.scss']
})

export class ConsumerProfileTitleComponent implements OnInit {
    @Input()
    consumerProfile: ConsumerProfile;

    constructor(private router: Router) { }

    ngOnInit() {
    }
    viewDetails(id: number) {
        this.router.navigateByUrl('/dashboard/vibiio-profile/'+ id);
    }
}
