import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'appointment-notification',
    styleUrls: ['./appointment-notification.component.scss'],
    template: `
<div class="notification-bar" [ngClass]="{'first-bar': rowIndex == 0}" title="{{ notificationData.content.message_body }}">
  <div class="wrapper">
    <div class="top-row">
        <div class="notification">
            <div class="name">{{ parseConsumer() }}</div>
            <span class="pink"></span>
            <div class="timer">Waiting for {{ parseWaitingTime() }} seconds</div>
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
        // There is a point in the lifecycle where it freezes up on receiving a new vibiio , because it is still null
        return this.notificationData.content.message_body.match(/Consumer:(.*)Waiting:/)[1];
    }

    parseWaitingTime() {
        if (this.notificationData.content.message_body.match(/Description:/)) {
            return this.notificationData.content.message_body.match(/Waiting:(.*)Description:/)[1];
        } else {
            return this.notificationData.content.message_body.match(/Waiting:(.*)/)[1];
        }
    }

    parseDescription() {
        if (this.notificationData.content.message_body.match(/Description:/)) {
            return this.notificationData.content.message_body.match(/Description:(.*)/)[1];
        }
    }
}
