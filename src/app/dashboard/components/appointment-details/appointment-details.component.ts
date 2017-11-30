import { Component, Input, EventEmitter, Output, ViewChild, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as screenfull from 'screenfull';

// Services
import { AppointmentService } from '../../services/appointment.service';
import { VibiioUpdateService } from '../../services/vibiio-update.service';
import { SidebarCustomerStatusSharedService } from '../../services/sidebar-customer-status-shared.service';
import { AvailabilitySharedService } from '../../services/availability-shared.service';
import { DateFormatService } from '../../../services/date-format.service';
import { AppointmentDetailsFormStatusService } from '../../services/appointment-details-form-status.service';

// Components
import { ConsumerAddressComponent } from '../consumer-address/consumer-address.component';

// Interfaces
import { Appointment } from '../../models/appointment.interface';
import { User } from '../../models/user.interface';
import { Vibiio } from '../../models/vibiio.interface';
import { Note } from '../../models/consumer-note.interface';
import { ResponseErrorService } from '../../../services/response-error.service';
import { InsurancePolicy } from '../../models/insurance-policy.interface';
import { ConsumerUpdateService } from '../../services/consumer-update.service';

@Component({
    selector: 'vib-appointment-details',
    templateUrl: 'appointment-details.component.html',
    styleUrls: ['appointment-details.component.scss']
})

export class AppointmentDetailsComponent {
    imgData: string;
    vibiioFullscreen = false;
    isEditingForms = false;
    isUpdatingForms = false;

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

    @ViewChild(ConsumerAddressComponent) addressForm: ConsumerAddressComponent;

    constructor(private StatusUpdateService: VibiioUpdateService,
                private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService,
                private availabilitySharedService: AvailabilitySharedService,
                private dateFormatService: DateFormatService,
                private router: Router,
                private formStatusService: AppointmentDetailsFormStatusService,
                private consumerUpdateService:  ConsumerUpdateService) {}


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

    updateAddress() {
      if (this.addressForm.editForm.valid) {
        const address = this.addressForm.editForm.value;
        this.consumerUpdateService.updateAddress(address)
          .subscribe( (data) => {
            this.appointment.address = data.address;
          });
      }
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

    onEdit() {
      this.isEditingForms = true;
      this.formStatusService.onFormEdit();
  }

  onUpdate() {
      this.isUpdatingForms = true;
      this.formStatusService.onFormUpdate();
      this.updateAddress();
  }

  onCancel() {
      this.isEditingForms = false;
      this.formStatusService.onCancel();
      this.consumerUpdateService.refreshAddress(this.appointment.address.id)
        .subscribe( (data) => {
          this.appointment.address = data.address;
        });
  }

  toggleVibiioFullscreen() {
    this.vibiioFullscreen = !this.vibiioFullscreen;

    // Toggles fullscreen using screenfull package
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }
}
