import { Component, Input } from '@angular/core';
import { CustomerProfileComponent } from '../../components/customer-profile/customer-profile.component';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

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

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.appointments = data.appointments.appointments
        })
    }

}
