import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

// Models
import { ConsumerProfile } from '../../models/consumer-profile.interface';

@Component({
    selector: 'consumer-profile',
    templateUrl: 'consumer-profile.component.html',
    styleUrls: ['consumer-profile.component.scss']
})

export class ConsumerProfileComponent implements OnInit {
    @Input()
    consumerProfile: ConsumerProfile; 

    ngOnInit(){
        console.log(this.consumerProfile);
    }
}