import { Component, Input, Output, EventEmitter } from '@angular/core';

// Models
import { ConsumerProfile } from '../../models/consumer-profile.interface';

@Component({
    selector: 'consumer-profile',
    templateUrl: 'consumer-profile.component.html',
    styleUrls: ['consumer-profile.component.scss']
})

export class ConsumerProfileComponent {
    @Input()
    consumerProfile: ConsumerProfile; 
}