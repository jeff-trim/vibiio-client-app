import {
  Component,
  Input,
  EventEmitter,
  Output,
  ViewChild
} from "@angular/core";

// Services
import { DateFormatService } from "../../../services/date-format.service";
import { ConsumerUpdateService } from "../../services/consumer-update.service";

// Components
import { ConsumerAddressComponent } from "../consumer-address/consumer-address.component";

// Models
import { Appointment } from "../../models/appointment.interface";
import { User } from "../../models/user.interface";
import { Vibiio } from "../../models/vibiio.interface";
import { Note } from "../../models/consumer-note.interface";
import { InsurancePolicy } from "../../models/insurance-policy.interface";
import { Address } from "../../models/address.interface";
import { VideoSnapshot } from "../../models/video-snapshot.interface";
import { Consultant } from "../../models/consultant.interface";

@Component({
  selector: "vib-appointment-details",
  templateUrl: "appointment-details.component.html",
  styleUrls: ["appointment-details.component.scss"]
})
export class AppointmentDetailsComponent {
  @Input() appointment: Appointment;
  @Input() user: User;
  @Input() vibiio: Vibiio;
  @Input() address: Address;
  @Input() relocationAddress: Address;
  @Input() snapshots: VideoSnapshot[];
  @Input() onVibiio: boolean;
  @Input() timeZone: string;
  @Input() isEditingForms = false;
  @Input() isUpdatingForms = false;
  @Input() consultants: Consultant[];

  @Output() startVibiio = new EventEmitter<boolean>();
  @Output() claimVibiio = new EventEmitter<boolean>();
  @Output() refreshNotes = new EventEmitter<any>();
  @Output() updateVibiioStatus = new EventEmitter<any>();
  @Output() isEditing = new EventEmitter<boolean>();
  @Output() isUpdating = new EventEmitter<boolean>();
  @Output() refreshAddress = new EventEmitter<boolean>();

  @ViewChild(ConsumerAddressComponent) addressForm: ConsumerAddressComponent;

  constructor(
    private dateFormatService: DateFormatService,
    private consumerUpdateService: ConsumerUpdateService
  ) {}

  updateAddress() {
    if (this.addressForm.editForm.valid) {
      const address = this.addressForm.editForm.value;
      this.consumerUpdateService.updateAddress(address).subscribe(data => {
        this.address = data.address;
        this.isEditingForms = false;
      });
    }
  }

  onCancel() {
    this.refreshAddress.emit(true);
    this.consumerUpdateService
      .refreshAddress(this.address.id)
      .subscribe(data => {
        this.addressForm.editForm.patchValue(data.address);
        this.isEditingForms = false;
      });
  }

  updateStatus(status: any) {
    this.updateVibiioStatus.emit(status);
  }

  connect() {
    this.startVibiio.emit(true);
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

  onEdit(formChanged: boolean) {
    this.isEditing.emit(formChanged);
  }

  onUpdate() {
    this.isUpdating.emit(true);
    this.updateAddress();
  }
}
