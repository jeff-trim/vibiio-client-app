import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { AppointmentService } from '../../services/appointment.service';
import { VibiioUpdateService } from '../../services/vibiio-update.service';
import { SidebarCustomerStatusSharedService } from '../../services/sidebar-customer-status-shared.service';
import { AvailabilitySharedService } from '../../services/availability-shared.service';
import { DateFormatService } from '../../../services/date-format.service';

// Components
import { NotesComponent } from '../../containers/notes/notes.component';

// Interfaces
import { Appointment } from '../../models/appointment.interface';
import { User } from '../../models/user.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { Note } from '../../models/consumer-note.interface';
import { ResponseErrorService } from '../../../services/response-error.service';

@Component({
    selector: 'appointment-details',
    templateUrl: 'appointment-details.component.html',
    styleUrls: ['appointment-details.component.scss']
})

export class AppointmentDetailsComponent  {
    imgData: string;

    @Input()
    updateStatusReminder = false;

    @Input()
    onVibiio: boolean;

    @Input()
    appointment: Appointment;

    @Input()
    user: User;

    @Input()
    vibiio: Vibiio;

    @Input()
    neworkDisconnected: boolean;

    @Input()
    timeZone: string;

    @Output()
    startVibiio: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    endVibiio: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    claimVibiio: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private StatusUpdateService: VibiioUpdateService,
                private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
                private availabilitySharedService: AvailabilitySharedService,
                private dateFormatService: DateFormatService) {
                }

    updateStatus(event) {
      const options = { status: event.status };
      this.StatusUpdateService
        .updateVibiio(options, event.vibiioId)
        .subscribe( (data) => {
            this.vibiio = data.vibiio;
            this.updateStatusReminder = false;
            this.sidebarCustomerStatusSharedService.emitChange(data);
        }, (error: any) => {
            console.log('error updating claim status');
        });
    }

   connect() {
    this.startVibiio.emit(event);
    this.onVibiio = true;
    this.updateStatusReminder = false;
    // check to see if appointment has been claimed and auto assign
    if (this.appointment.vibiiographer_id == null) {
      this.claimVibiio.emit(true);
    }
  }

    disconnect() {
    this.endVibiio.emit(event);
    this.onVibiio = false;
    this.updateStatusReminder = true;
    this.availabilitySharedService.emitChange(true);
  }

  toggleUpdateStatusReminder() {
    this.updateStatusReminder = !this.updateStatusReminder;
  }

  parseDate(time: number): string  {
    return this.dateFormatService.parseDate(time, this.timeZone);
  }

  parseTime(time: number): string  {
    return this.dateFormatService.parseTime(time, this.timeZone);
  }
}
