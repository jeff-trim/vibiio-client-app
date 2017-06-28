import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router'

// components
import { ConsumerProfileComponent } from '../../components/consumer-profile/consumer-profile.component';

// Services
import { ConsumerStatusService } from '../../services/consumer-status.service';

// Interfaces
import { ConsumerProfile } from '../../models/consumer-profile.interface';

@Component({
    selector: 'consumer-status',
    templateUrl: 'consumer-status.component.html',
    styleUrls: ['consumer-status.component.scss']
})

export class ConsumerStatusComponent implements OnInit {
    consumer_profile: ConsumerProfile[];

    constructor(private activatedRoute: ActivatedRoute,
                private consumerStatusService: ConsumerStatusService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            console.log(data);
            this.consumer_profile = data.cons.consumers
        })
    }
}
