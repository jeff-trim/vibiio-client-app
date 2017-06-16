import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

// services
import { AppointmentService } from '../../services/appointment.service'


// Components
import { KeyValueComponent } from '../key-value/key-value.component'

// Interfaces
import { Appointment } from '../../models/appointment.interface'
import { User } from '../../models/user.interface'

@Component({
    selector: 'appointment-details',
    templateUrl: 'appointment-details.component.html',
    styleUrls: ['appointment-details.component.scss']
})

export class AppointmentDetailsComponent  {
    @Input()
    appointment: Appointment;

    @Input()
    user: User;

    @Output()
    updateAppointment: EventEmitter<any> = new EventEmitter<any>()

}
