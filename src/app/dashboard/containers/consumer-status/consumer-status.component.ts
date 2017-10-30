import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

// Services
import { ConsumerStatusService } from '../../services/consumer-status.service';

// Interfaces
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { VideoSnapshot } from '../../models/video-snapshot.interface';
import { Vibiio } from '../../models/vibiio.interface';

@Component({
    selector: 'consumer-status',
    templateUrl: 'consumer-status.component.html',
    styleUrls: ['consumer-status.component.scss']
})

export class ConsumerStatusComponent implements OnInit {
    consumerProfiles: ConsumerProfile[];
    consumerStatus: string;

    constructor(private activatedRoute: ActivatedRoute,
                private consumerStatusService: ConsumerStatusService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.consumerProfiles = data.cons.vibiios;
        });
        console.log(this.consumerProfiles);

        this.activatedRoute.params.subscribe((params) => {
            if (params['status'] === undefined) {
                this.consumerStatus = 'All customers';
            } else {
                this.consumerStatus = params['status'].charAt(0).toUpperCase()
                    + params['status'].slice(1);
            }
        });
    }
    sortConsumers(sortType: string) {
        // call service
        // return property and direction
    }

}
