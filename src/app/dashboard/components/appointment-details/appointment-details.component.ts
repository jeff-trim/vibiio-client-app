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
import { ResponseErrorService } from '../../../services/response-error.service';
import { VideoSnapshotService } from '../../services/video-snapshot.service';

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
    subscriber: any;

    @Input()
    vibiio: Vibiio;

    @Input()
    consumer: number;

    @Output()
    startVibiio: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    endVibiio: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    checkSubscriptionStatus: EventEmitter<any> = new EventEmitter<any>();

    constructor(private StatusUpdateService: VibiioUpdateService, private snapshotService: VideoSnapshotService) {}

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

  toggleUpdateStatusReminder() {
    this.updateStatusReminder = !this.updateStatusReminder;
  }

  checkIt() {
    console.log(this.subscriber.isSubscribing());
    this.checkSubscriptionStatus.emit(event);
    this.imgData = this.subscriber.getImgData();
    console.log(this.subscriber);
    this.snapshotService.saveSnapshot(this.consumer, '1_MX40NTUwMDI5Mn5-MTUwMjI1MTQyOTYyMH5TU1JXLzFweTJ4dFJpckdLZHNsUWtoazV-fg', this.imgData);
  }
}
