import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { RemoveUnderscorePipe } from '../../pipes/remove-underscore.pipe';

// Services
import { ConsumerStatusService } from '../../services/consumer-status.service';
import { ConsumerSortService } from '../../services/consumer-sort.service';
import { AllConsumersService } from '../../services/all-consumers.service';

// Interfaces
import { ConsumerProfile } from '../../models/consumer-profile.interface';
import { VideoSnapshot } from '../../models/video-snapshot.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { SortType } from '../../models/sort-type.interface';

// Pipes
import { OrderByPipe } from '../../pipes/order-by.pipe';

@Component({
    selector: 'vib-consumer-status',
    templateUrl: 'consumer-status.component.html',
    styleUrls: ['consumer-status.component.scss']
})

export class ConsumerStatusComponent implements OnInit {
    consumerProfiles: any;
    consumerStatus: string;
    displayStatus: string;
    sortTypes: SortType[];
    direction = 1;
    property = 'appointment_scheduled_datetime';

    constructor(private activatedRoute: ActivatedRoute,
                private sortService: ConsumerSortService,
                private consumersService: AllConsumersService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe((res) => {
            console.log('res', res);
            this.consumerProfiles = res.data;
        });

        this.activatedRoute.params.subscribe((params) => {
            if (params['status'] !== undefined) {
                this.consumerStatus = params['status'];
                this.displayStatus = this.consumerStatus.charAt(0).toUpperCase()
                    + params['status'].slice(1);
            } else {
                this.displayStatus = 'All Consumers';
            }
        });

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
                .subscribe( res => {
                console.log(res);
                this.consumerProfiles = res;
            });
        } else {
            this.consumersService
                .index(query)
                .subscribe( res => {
                    console.log(res);
                    this.consumerProfiles = res;
            });
        }
      }
}
