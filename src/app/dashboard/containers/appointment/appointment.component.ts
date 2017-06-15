import { Component, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Components
import { AppointmentDetailsComponent } from '../../components/appointment-details/appointment-details.component';

// Interfaces
import { Appointment } from '../../models/appointment.interface';

// Services
import { AppointmentResolver } from '../../services/appointment.resolver.service';

@Component({
    selector: 'appointment',
    templateUrl: 'appointment.component.html'
})

export class AppointmentComponent implements OnInit {
    index: number;
    appointment: Appointment;

    constructor(private activatedRoute: ActivatedRoute ){}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
           this.index = params['id'];
         });      

        this.activatedRoute.data.subscribe( (data) => {
            this.appointment = data.appointment;
            console.log(this.appointment)            
            }, (error) => {
                console.log(error);
            }
        )
    }
}
