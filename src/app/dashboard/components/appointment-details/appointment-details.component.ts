import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { AppointmentService } from '../../services/appointment.service';

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

export class AppointmentDetailsComponent implements OnInit {
    onVibiio: boolean = false;

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

    ngOnInit() {
      console.log(this.appointment);
    }
   connect() {
    this.startVibiio.emit(event);
    this.onVibiio = true;
  }

    disconnect() {
    this.endVibiio.emit(event);
    this.onVibiio = false;
  }
}
