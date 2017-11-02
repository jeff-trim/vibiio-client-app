import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

// Components
import { InsurancePolicyComponent } from '../insurance-policy/insurance-policy.component';

// Services
import { ConsumerStatusService } from '../../services/consumer-status.service';
import { ConsumerSortService } from '../../services/consumer-sort.service';

// Interfaces
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { VideoSnapshot } from '../../models/video-snapshot.interface';
import { Vibiio } from '../../models/vibiio.interface';
import {SortType } from '../../models/sort-type.interface';

// Pipes
import { OrderByPipe } from '../../pipes/order-by.pipe';


@Component({
    selector: 'vib-consumer-status',
    templateUrl: 'consumer-status.component.html',
    styleUrls: ['consumer-status.component.scss']
})

export class ConsumerStatusComponent implements OnInit {
    consumerProfiles: ConsumerProfile[];
    consumerStatus: string;
    sortTypes: SortType[];
    direction = 1;
    property = 'appointment_scheduled_datetime';

    constructor(private activatedRoute: ActivatedRoute,
                private consumerStatusService: ConsumerStatusService,
                private sortService: ConsumerSortService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.consumerProfiles = data.cons.vibiios;
            // this.consumerProfiles.forEach( (profile) => {
            //     console.log(profile.insurance_policies);
            // });
        });

        this.sortTypes = this.sortService.build();

        this.activatedRoute.params.subscribe((params) => {
            if (params['status'] === undefined) {
                this.consumerStatus = 'All customers';
            } else {
                this.consumerStatus = params['status'].charAt(0).toUpperCase()
                    + params['status'].slice(1);
            }
        });
    }

    sortConsumers(name: string) {
        const sortOptions = this.sortService.getOptions(name);

        this.direction = Object.assign({}, this.direction, sortOptions.desc ? 1 : -1);
        this.property = Object.assign({}, this.property, sortOptions.property);
    }
}
