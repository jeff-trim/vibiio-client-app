import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'appointment-notification',
    styleUrls: ['./appointment-notification.component.scss'],
    templateUrl: 'appointment-notification.component.html'
})

 // There is a point in the lifecycle where it freezes up on receiving a new notification, because it is still null
export class AppointmentNotificationComponent {
    @Input()
    notificationData;

    @Input()
    rowIndex: number;

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

    parseConsumer() {
        return this.notificationData.content.message_body.match(/Consumer:(.*)Waiting:/)[1];
      }

    parseWaitingTime() {
        if (this.notificationData.content.message_body.match(/Description:/)) {
            return this.notificationData.content.message_body.match(/Waiting:(.*)Description:/)[1];
        } else {
            return this.notificationData.content.message_body.match(/Waiting:(.*)/)[1];
        }
    }

    // Hours not included because consumers can schedule vibiios after 2 minutes
    parseMinutes() {
        const waitingTime = this.parseWaitingTime();
        return waitingTime.match(/:(.*)/)[1].split(':')[0].replace(/^0+/, '');
    }

    parseSeconds() {
        const waitingTime = this.parseWaitingTime();
        return waitingTime.match(/:(.*)/)[1].split(':')[1].replace(/^0+/, '');
    }

    parseDescription() {
        if (this.notificationData.content.message_body.match(/Description:/)) {
            return this.notificationData.content.message_body.match(/Description:(.*)/)[1];
        }
    }
}
