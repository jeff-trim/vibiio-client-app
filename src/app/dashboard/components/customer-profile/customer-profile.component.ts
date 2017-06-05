import { Component, Input, Output, EventEmitter } from '@angular/core';

// interfaces
import { Appointment } from '../../models/appointment.interface';


@Component({
    selector: 'customer-profile',
    templateUrl: 'customer-profile.component.html',
    styleUrls: ['customer-profile.component.scss']
})

export class CustomerProfileComponent {
    @Input()
    appointment: Appointment

    @Output()
    removeAppointment: EventEmitter<Appointment> = new EventEmitter<Appointment>()

    claimAppointment(appointment: Appointment){
        this.removeAppointment.emit(appointment)
    }
}
