import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MomentModule } from 'angular2-moment';

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
    range
    rangeMin: number
    rangeMax: number

    @Output()
    rangeChange: EventEmitter<any> = new EventEmitter<any>();

    constructor(private activatedRoute: ActivatedRoute) {}

    onChange(value){
        this.range = value
        this.rangeChange.emit(this.range)
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.appointments = data.appointments.appointments
            this.rangeMin = this.appointments[0].scheduled_datetime
            this.rangeMax = this.appointments[this.appointments.length - 1].scheduled_datetime
            this.range = [this.rangeMin, this.rangeMax]
        })
    }

}
