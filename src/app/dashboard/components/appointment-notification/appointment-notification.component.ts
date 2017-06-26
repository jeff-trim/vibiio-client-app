import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'appointment-notification',
    styleUrls: ['./appointment-notification.component.scss'],
    template: `
<div class="notification-bar">
  <div class="message">{{ notificationData.consumerName }}is requesting a live vibiio!</div>
  <div class="button-wrap">
    <span class="button-label">Start Vibiio</span>
    <img class="claim-button"
         (click)="claimAppointment()"
         src="assets/images/start_white.svg" />
  </div>
</div>
`
})

export class AppointmentNotificationComponent {
    @Input()
    notificationData

    @Output()
    emitAppointment: EventEmitter<any> = new EventEmitter<any>()

    constructor(){}

    claimAppointment(){
        this.emitAppointment.emit({
            // vibiiographerId: this.vibiiographerProfile.user.profile.id,
            // consumerId: this.vibiiographerProfile.
        })
    }
}
