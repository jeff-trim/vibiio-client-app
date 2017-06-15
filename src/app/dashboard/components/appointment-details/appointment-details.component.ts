import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';

// Components 
import { KeyValueComponent } from '../key-value/key-value.component';

// Interfaces
import { Appointment } from '../../models/appointment.interface';

@Component({
    selector: 'appointment-details',
    templateUrl: 'appointment-details.component.html',
    styleUrls: ['appointment-details.component.scss']
})

export class AppointmentDetailsComponent implements OnInit, OnChanges {
    @Input()
    appointment: Appointment;

    @Output()
    updateAppointment: EventEmitter<any> = new EventEmitter<any>()

    ngOnInit(){
        console.log(this.appointment)
    }

    ngOnChanges(){
        console.log('changes', this.appointment.user)        
    }
}