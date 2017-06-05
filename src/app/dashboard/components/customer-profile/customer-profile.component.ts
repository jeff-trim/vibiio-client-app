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
    updateAppointment: EventEmitter<Appointment> = new EventEmitter<Appointment>()

    releaseAppointment(appointment: Appointment){
        // sets current user to null so when the record
        // is updated in the api we reset the value to nil
        // this in essence acts as deleting the vibiiographer
        // from the current appointment
        appointment.current_user = null
        console.log(appointment)
        this.updateAppointment.emit(appointment)
    }

    claimAppointment(appointment: Appointment){
        this.updateAppointment.emit(appointment)
    }
}
