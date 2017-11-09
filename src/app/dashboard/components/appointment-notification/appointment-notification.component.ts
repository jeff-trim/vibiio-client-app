import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'appointment-notification',
    styleUrls: ['./appointment-notification.component.scss'],
    template: `
<div class="notification-bar" [ngClass]="{'first-bar': rowIndex == 0}" title="{{ parseDescription() }}">
  <div class="wrapper">
    <div class="top-row">
        <div class="notification">
            <div class="name">{{ parseConsumer() }}</div>
            <span class="pink"></span>

            <div class="timer" *ngIf="parseMinutes() == 1">
                Waiting for <span>{{ parseMinutes() }} minute and </span>{{ parseSeconds() }} seconds
            </div>
            <div class="timer" *ngIf="parseMinutes() > 1">
                Waiting for <span>{{ parseMinutes() }} minutes and </span>{{ parseSeconds() }} seconds
            </div>
            <div class="timer" *ngIf="parseMinutes() == 0">
                Waiting for {{ parseSeconds() }} seconds
            </div>
        </div>

        <div class="button-wrap" *ngIf="displayConnectIcon()">
            <span class="button-label">Start Vibiio</span>
            <img class="claim-button"
                (click)="emitAppointment()"
                src="assets/images/start.svg" />
        </div>
    </div>

    <div class="bottom-row">
        <div class="description" *ngIf="parseDescription()">{{ parseDescription() }}</div>
    </div>

  </div>
</div>
`
})

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
        // There is a point in the lifecycle where it freezes up on receiving a new notification, because it is still null
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
