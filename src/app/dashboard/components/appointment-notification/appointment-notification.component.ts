import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Notification } from '../../models/notification.interface';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'appointment-notification',
    styleUrls: ['./appointment-notification.component.scss'],
    templateUrl: 'appointment-notification.component.html'
})

 // There is a point in the lifecycle where it freezes up on receiving a new notification, because it is still null
export class AppointmentNotificationComponent implements OnInit, OnDestroy {
    consumerName: string;
    waitingTime: string;
    minutes: number;
    seconds: number;
    description: string;
    language: string;
    private timer;
    private sub: Subscription;
    fullDescription: boolean;

    @Input()
    notificationData: Notification;

    @Input()
    rowIndex: number;

    @Output()
    claimAppointment: EventEmitter<any> = new EventEmitter<any>();
    messageBody: string;

    constructor() {}

    ngOnInit() {
        this.fullDescription = false;
        this.consumerName = JSON.parse(this.notificationData.content.message_body).consumer;
        this.description = JSON.parse(this.notificationData.content.message_body).description;
        this.minutes = parseInt(JSON.parse(this.notificationData.content.message_body).minutes.replace(/^0+/, '')) || 0;
        this.seconds = parseInt(JSON.parse(this.notificationData.content.message_body).seconds.replace(/^0+/, '')) || 0;
        this.timer = Observable.timer(0, 1000);
        this.sub = this.timer.subscribe(t => this.tickerFunc());
        this.language = this.notificationData.content.language;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    tickerFunc() {
        if (this.seconds < 59) {
            this.seconds += 1;
        } else {
            this.minutes = this.minutes += 1;
            this.seconds = 0;
        }
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
