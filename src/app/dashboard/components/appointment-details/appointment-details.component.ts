import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { AppointmentService } from '../../services/appointment.service';
import { VibiioUpdateService } from '../../services/vibiio-update.service';

// Components
import { NotesComponent } from '../../containers/notes/notes.component';

// Interfaces
import { Appointment } from '../../models/appointment.interface';
import { User } from '../../models/user.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { Note } from '../../models/consumer-note.interface';

@Component({
    selector: 'appointment-details',
    templateUrl: 'appointment-details.component.html',
    styleUrls: ['appointment-details.component.scss']
})

export class AppointmentDetailsComponent  {
    onVibiio = false;
    updateStatusReminder= false;

    @Input()
    appointment: Appointment;

    @Input()
    user: User;

    @Input()
    vibiio: Vibiio;

    @Output()
    startVibiio: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    endVibiio: EventEmitter<any> = new EventEmitter<any>();

    constructor(private StatusUpdateService: VibiioUpdateService) {}

    updateStatus(event) {
      const options = { status: event.status };
      this.StatusUpdateService
        .updateVibiio(options, event.vibiioId)
        .subscribe( (data) => {
            this.vibiio = data.vibiio;
            this.updateStatusReminder = false;
        }, (error: any) => {
            console.log('error updating claim status');
        });
    }

   connect() {
    this.startVibiio.emit(event);
    this.onVibiio = true;
    this.updateStatusReminder = false;
  }

    disconnect() {
    this.endVibiio.emit(event);
    this.onVibiio = false;
    this.updateStatusReminder = true;
  }
}
