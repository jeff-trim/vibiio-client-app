import { Component, Input } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MomentModule } from 'angular2-moment';

// components
import { CustomerProfileComponent } from '../../components/customer-profile/customer-profile.component';

// Services
import { CustomerProfileService } from '../../services/customer-profile.service';
import { TodaysVibiiosService } from '../../services/todays-vibiios.service';
import { MyDayService } from '../../services/my-day.service'

// Interfaces
import { Appointment } from '../../models/appointment.interface';
import { CustomerProfile } from '../../models/customer-profile.interface';
import { TodaysVibiios } from '../../models/todays-vibiios.interface';

@Component({
    selector: 'my-vibiios',
    templateUrl: 'my-vibiios.component.html',
    styleUrls: ['my-vibiios.component.scss']
})

export class MyVibiiosComponent {
    appointments: Appointment[]
    range
    rangeMin: number
    rangeMax: number

    constructor(private activatedRoute: ActivatedRoute,
                private myDayService: MyDayService) {}

    onChange(value){
        this.range = value
    }

    removeAppointment(appointment: Appointment){
        this.myDayService.updateMyDay(appointment.id, appointment.current_user)
            .subscribe(response => console.log(response))
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
