import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'appointment-notification',
    styleUrls: ['./appointment-notification.component.scss'],
    templateUrl: 'appointment-notification.component.html'
})

 // There is a point in the lifecycle where it freezes up on receiving a new notification, because it is still null
export class AppointmentNotificationComponent implements OnInit {
    consumerName: string;
    waitingTime: string;
    minutes: string;
    seconds: string;
    description: string;

    @Input()
    notificationData;

    @Input()
    rowIndex: number;

    @Output()
    claimAppointment: EventEmitter<any> = new EventEmitter<any>();
    messageBody: string;

    constructor() {}

    ngOnInit() {
        this.consumerName = JSON.parse(this.notificationData.content.message_body).consumer;
        this.description = JSON.parse(this.notificationData.content.message_body).description;
        this.minutes = JSON.parse(this.notificationData.content.message_body).minutes.replace(/^0+/, '');
        this.seconds = JSON.parse(this.notificationData.content.message_body).seconds.replace(/^0+/, '');
    }

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
