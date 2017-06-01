import { Component, Input, SimpleChanges } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

// components
import { CustomerProfileComponent } from '../../components/customer-profile/customer-profile.component';

// Services
import { CustomerProfileService } from '../../services/customer-profile.service';
import { TodaysVibiiosService } from '../../services/todays-vibiios.service';

// Interfaces
import { CustomerProfile } from '../../models/customer-profile.interface';
import { TodaysVibiios } from '../../models/todays-vibiios.interface';

@Component({
    selector: 'my-vibiios',
    templateUrl: 'my-vibiios.component.html',
    styleUrls: ['my-vibiios.component.scss']
})

export class MyVibiiosComponent {
    appointments: any
    rangeMin: any = 0
    rangeMax: any = 23
    range = [0,24]

    constructor(private activatedRoute: ActivatedRoute) {}

    onChange(value){
        console.log(value)
        this.range = value
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.appointments = data.appointments.appointments
            // this.rangeMin = this.appointments[0].scheduled_datetime
            // this.rangeMax = this.appointments[this.appointments.length - 1].scheduled_datetime
        })
    }

}
