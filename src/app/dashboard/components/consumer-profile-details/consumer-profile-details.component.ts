import { Component, Input, OnInit ,EventEmitter, Output } from '@angular/core';
import { ConsumerProfileDetails } from '../../models/consumer-profile-details.interface';

@Component({
    selector: 'consumer-profile-details',
    templateUrl: 'consumer-profile-details.component.html',
    styleUrls: ['consumer-profile-details.component.scss']
})

export class ConsumerProfileDetailsComponent implements OnInit {
    @Input()
    profile: ConsumerProfileDetails

    @Output()
    updateAppointment: EventEmitter<any> = new EventEmitter<any>()

    ngOnInit(){}
}