import { Component, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Components
import { ConsumerProfileDetailsComponent } from '../../components/consumer-profile-details/consumer-profile-details.component';

// Interfaces
import { ConsumerProfileDetails } from '../../models/consumer-profile-details.interface';

// Services
import { ConsumerProfileService } from '../../services/consumer-profile.service';

@Component({
    selector: 'consumer-profile',
    templateUrl: 'consumer-profile.component.html'
})

export class ConsumerProfileComponent implements OnInit {
    index: number;
    
    profile: ConsumerProfileDetails;

    constructor(private consumerProfile: ConsumerProfileService,
                private activatedRoute: ActivatedRoute ){}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
           this.index = params['id'];
         });
         console.log(this.index);
         
        this.consumerProfile.getConsumerProfileDetails(this.index)
        .subscribe( (data) => {
            console.log(data);
            this.profile = data.serializer.user
            }, (error) => {
                console.log(error);
            }
        )
    }
}
