import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { ConsumerSortService } from '../../services/consumer-sort.service';
import { AllConsumersService } from '../../services/all-consumers.service';

// Interfaces
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { SortType } from '../../models/sort-type.interface';

@Component({
    selector: 'vib-consumer-status',
    templateUrl: 'consumer-status.component.html',
    styleUrls: ['consumer-status.component.scss']
})

export class ConsumerStatusComponent implements OnInit {
    consumerProfiles: ConsumerProfile[];
    consumerStatus: string;
    displayStatus: string;
    sortTypes: SortType[];
    direction = 1;
    property = 'appointment_scheduled_datetime';

    constructor(private activatedRoute: ActivatedRoute,
        private sortService: ConsumerSortService,
        private consumersService: AllConsumersService) {

        this.activatedRoute.data.subscribe((res) => {
            this.consumerProfiles = res.data;
        });

        this.activatedRoute.params.subscribe((params) => {
            if (params['status'] !== '') {
                this.consumerStatus = params['status'];
                this.displayStatus = this.consumerStatus.charAt(0).toUpperCase()
                    + params['status'].slice(1);
            } else {
                this.displayStatus = 'All Customers';
            }
        });
    }

    ngOnInit() {
        this.sortTypes = this.sortService.build();
    }

    sortConsumers(name: string) {
        const sortOptions = this.sortService.getOptions(name);
        this.direction = sortOptions.desc ? 1 : -1;
        this.property = sortOptions.property;
    }

    search(query: string) {
        if (this.consumerStatus) {
            this.consumersService
                .byStatus(this.consumerStatus, query)
                .subscribe(res => this.consumerProfiles = res);
        } else {
            this.consumersService
                .index(query)
                .subscribe(res => this.consumerProfiles = res);
        }
    }
}
