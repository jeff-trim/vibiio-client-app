import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { DateFormatService } from '../../../services/date-format.service';

// Components
import { NotesComponent } from '../../containers/notes/notes.component';

// Interfaces
import { Appointment } from '../../models/appointment.interface';
import { User } from '../../models/user.interface';
import { Vibiio } from '../../models/vibiio.interface';

@Component({
    selector: 'vib-appointment-details',
    templateUrl: 'appointment-details.component.html',
    styleUrls: ['appointment-details.component.scss']
})

export class AppointmentDetailsComponent  {
    imgData: string;

    @Input() vibiioConnecting: boolean;

    @Input() onVibiio: boolean;

    @Input() appointment: Appointment;

    @Input() user: User;

    @Input() vibiio: Vibiio;

    @Input() neworkDisconnected: boolean;

    @Input() timeZone: string;

    @Output() startVibiio: EventEmitter<any> = new EventEmitter<any>();

    @Output() endVibiio: EventEmitter<any> = new EventEmitter<any>();

    @Output() refreshNotes: EventEmitter<any> = new EventEmitter<any>();

    @Output() updateStatus = new EventEmitter<Vibiio>();

    constructor(private dateFormatService: DateFormatService) {}

    updateVibiioStatus(vibiio) {
      this.updateStatus.emit(vibiio);
    }

    connect() {
      this.startVibiio.emit(event);
    }

    disconnect() {
      this.endVibiio.emit(event);
    }

    updateNotes() {
      this.refreshNotes.emit(event);
    }

    parseDate(time: number) {
      return this.dateFormatService.parseDate(time, this.timeZone);
    }

    parseTime(time: number) {
      return this.dateFormatService.parseTime(time, this.timeZone);
    }
}
