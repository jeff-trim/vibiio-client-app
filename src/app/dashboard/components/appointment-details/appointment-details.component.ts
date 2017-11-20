import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as screenfull from 'screenfull';

// Services
import { AppointmentService } from '../../services/appointment.service';
import { VibiioUpdateService } from '../../services/vibiio-update.service';
import { SidebarCustomerStatusSharedService } from '../../services/sidebar-customer-status-shared.service';
import { AvailabilitySharedService } from '../../services/availability-shared.service';
import { DateFormatService } from '../../../services/date-format.service';
import { InsuranceStatusService } from '../../services/insurance-status.service';

// Components
import { NotesComponent } from '../../containers/notes/notes.component';

// Interfaces
import { Appointment } from '../../models/appointment.interface';
import { User } from '../../models/user.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { Note } from '../../models/consumer-note.interface';
import { ResponseErrorService } from '../../../services/response-error.service';
import { InsurancePolicy } from '../../models/insurance-policy.interface';

@Component({
    selector: 'vib-appointment-details',
    templateUrl: 'appointment-details.component.html',
    styleUrls: ['appointment-details.component.scss']
})

export class AppointmentDetailsComponent  {
    imgData: string;
    vibiioFullscreen = false;
    isEditingInsurance = false;
    isUpdatingInsurance = false;

    @Input() vibiioConnecting: boolean;
    @Input() onVibiio: boolean;
    @Input() appointment: Appointment;
    @Input() user: User;
    @Input() vibiio: Vibiio;
    @Input() neworkDisconnected: boolean;
    @Input() timeZone: string;

    @Output() startVibiio = new EventEmitter<boolean>();
    @Output() endVibiio = new EventEmitter<boolean>();
    @Output() claimVibiio: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() refreshNotes: EventEmitter<any> = new EventEmitter<any>();

    constructor(private StatusUpdateService: VibiioUpdateService,
                private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
                private availabilitySharedService: AvailabilitySharedService,
                private dateFormatService: DateFormatService,
                private router: Router,
                private insuranceStatusService: InsuranceStatusService) {}

    updateStatus(event) {
      const options = { status: event.status };
      this.StatusUpdateService
        .updateVibiio(options, event.vibiioId)
        .subscribe( (data) => {
            this.vibiio = data.vibiio;
            this.sidebarCustomerStatusSharedService.emitChange(data);
        }, (error: any) => {
            console.log('error updating claim status');
        });
    }

    connect() {
      this.startVibiio.emit(true);
      this.vibiioConnecting = true;
      this.onVibiio = true;
      // check to see if appointment has been claimed and auto assign
      if (this.appointment.vibiiographer_id == null) {
        this.claimVibiio.emit(true);
      }
    }

    disconnect() {
      this.endVibiio.emit(true);
      this.vibiioConnecting = false;
      this.availabilitySharedService.emitChange(true);
      this.router.navigateByUrl('/dashboard/vibiio-profile/' + this.vibiio.id);
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

    onPolicyEdit() {
      this.isEditingInsurance = true;
      this.insuranceStatusService.editStatus(true);
  }

  onPolicyUpdate() {
      this.isUpdatingInsurance = true;
      this.insuranceStatusService.updateStatus(true);
  }

  onCancelPolicyEdit() {
      this.insuranceStatusService.cancelEdit(true);
      this.insuranceStatusService.updateStatus(false);
      this.insuranceStatusService.editStatus(false);
  }

  toggleVibiioFullscreen() {
    this.vibiioFullscreen = !this.vibiioFullscreen;

    // Toggles fullscreen using screenfull package
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }
}
