import { Component, Input, Output, EventEmitter } from '@angular/core';

// Service
import { DateFormatService } from '../../../services/date-format.service';

// interfaces
import { Appointment } from '../../models/appointment.interface';

// constants 
import { timezone } from '../../constants/timezone';

@Component({
    selector: 'customer-profile',
    templateUrl: 'customer-profile.component.html',
    styleUrls: ['customer-profile.component.scss']
})

export class CustomerProfileComponent {
    @Input()
    appointment: Appointment;

    @Input()
    index: number;

    @Input()
    vibiiographerId: number;

    @Input()
    timeZone: number;

    @Output()
    updateAppointment: EventEmitter<any> = new EventEmitter<any>();

    constructor(private dateFormatService: DateFormatService) { }

    // parses unix time and displays time in relation to timezone
    parseTime(time: number): string  {
        return this.dateFormatService.parseTime(time, this.timeZone);
    }

    parseDate(time: number): string  {
        return this.dateFormatService.parseDate(time, this.timeZone);
    }

    appointmentTimeZone(): String {
        const zone = timezone[this.appointment.timezone];
        return zone ? zone : timezone['America/New_York'];
    }

    toggleAppointment(appointment: Appointment) {
        if (this.appointment.vibiiographer_id === null) {
            this.appointment.vibiiographer_id = this.vibiiographerId;
            this.updateAppointment.emit({appointment: this.appointment, index: this.index });
        } else {

            // sets current user to null so when the record
            // is updated in the api we reset the value to nil
            // this in essence acts as deleting the vibiiographer
            // from the current appointment
            appointment.vibiiographer_id = null;
            this.updateAppointment.emit({appointment: appointment, index: this.index });
        }
    }
}
