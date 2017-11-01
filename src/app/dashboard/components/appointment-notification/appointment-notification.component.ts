import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'appointment-notification',
    styleUrls: ['./appointment-notification.component.scss'],
    template: `
<div class="notification-bar" title="{{ notificationData.content.message_body }}">
  <div class="message">{{ notificationData.content.message_body }}</div>
  <div class="button-wrap"
       *ngIf="displayConnectIcon()">
    <span class="button-label">Start Vibiio</span>
    <img class="claim-button"
         (click)="emitAppointment()"
         src="assets/images/start_white.svg" />
  </div>
</div>
`
})

export class AppointmentNotificationComponent {
    @Input()
    notificationData;

    @Output()
    claimAppointment: EventEmitter<any> = new EventEmitter<any>();
    messageBody: string;

    constructor() {}

    displayConnectIcon() {
        if (this.notificationData.notification_type === 'error') {
            return false;
        } else {
            return true;
        }
    }

    emitAppointment() {
        this.claimAppointment.emit(this.notificationData);
    }
}
