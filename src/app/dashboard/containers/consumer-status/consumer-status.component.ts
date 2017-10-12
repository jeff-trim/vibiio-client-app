import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import * as moment_tz from 'moment-timezone';

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
    // consumerProfile: ConsumerProfile;
    consumerStatus: string;
    timeZone: number;

    constructor(private activatedRoute: ActivatedRoute,
                private consumerStatusService: ConsumerStatusService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.consumerProfiles = data.cons.vibiios;
            // this.consumerProfiles.map(function(consumerProfile) {
            //     this.parseTime(consumerProfile.appointment_time);
            // });
            
            // this.consumerProfile.appointment_time = this.parseTime(this.consumerProfile.appointment_time);
        });
        this.activatedRoute.params.subscribe((params) => {
            if (params['status'] === undefined) {
                this.consumerStatus = 'All customers';
            } else {
                this.consumerStatus = params['status'].charAt(0).toUpperCase()
                    + params['status'].slice(1);
            }
        });
    }

    // parseTime(time: number): string  {
    //     return moment_tz.unix(time).tz(this.timeZone).format('h:mm A');
    // }
}
