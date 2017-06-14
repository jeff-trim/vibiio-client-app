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

    @Input()
    index: number

    @Input()
    vibiiographerId: number

    @Output()
    updateAppointment: EventEmitter<any> = new EventEmitter<any>()

    toggleAppointment(appointment: Appointment){
        if(this.vibiiographerId === null){
            this.updateAppointment.emit({appointment: appointment, index: this.index })
        } else {

            // sets current user to null so when the record
            // is updated in the api we reset the value to nil
            // this in essence acts as deleting the vibiiographer
            // from the current appointment
            appointment.vibiiographer_id = null
            this.updateAppointment.emit({appointment: appointment, index: this.index })
        }
    }
}
