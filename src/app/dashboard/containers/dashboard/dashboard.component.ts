import { Component, OnInit, Inject } from '@angular/core'
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

// libaries
// import * as ActionCable from 'actioncable'
import * as ActionCable from 'action-cable-react-jwt'
// Models
import { Vibiio } from '../../models/vibiio.interface'
import { VideoChatToken } from '../../models/video-chat-token.interface'
import { OPENTOK_API_KEY } from '../../../../environments/environment'

// Services
import { VideoChatTokenService } from '../../services/video-chat-token.service'
import { MyProfileResolver } from '../../services/my-profile.resolver.service'

// environment
import { ACTION_CABLE_URL } from '../../../../environments/environment';

declare var OT: any;


@Component({
    selector: 'app-vibiio', styleUrls: ['./dashboard.component.scss'],
  template: `
<div class="row">
  <app-sidebar (emitAvailability)="toggleActionCable($event)"
               class="col-xs-12
                      col-md-3
                      side-bar-component">
  </app-sidebar>
  <div class="col-xs-12
              col-md-9
              dashboard-outlet">
    <appointment-notification
      [notificationData]="currentNotificationData"
      (claimAppointment)="claimAppointment($event)"
      *ngIf="notificationShow"></appointment-notification>
    <router-outlet></router-outlet>
  </div>
</div>
`,
})

export class DashboardComponent implements OnInit {
    session: any;
    vibiio: Vibiio;
    token: VideoChatToken;
    subscription
    notificationShow: boolean = false
    vibiiographerProfile
    waitingConsumers = []
    currentNotificationData = {}
    userAvailability: boolean
    cable: any
    readonly jwt: string = localStorage.getItem('app-token')

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private tokenService: VideoChatTokenService
    ){}

    receiveNotificationData(data){
        if (data.notification_type === "notification") {
            this.waitingConsumers.unshift({
                consumerName: data.content.consumer_name,
                consumerId: data.content.consumer_id,
                vibiioId: data.content.vibiio_id
            })
            this.currentNotificationData = data
            this.notificationShow = true
        } else if (data.notification_type === "error") {
            this.currentNotificationData = data
        } else if (data.notification_type === "success"){
            this.router.navigateByUrl("/dashboard/appointment/" + data.content.appointment_id)
            this.notificationShow = false
        }
    }

    toggleActionCable(event){
        this.userAvailability = event
        let comp = this
        if(this.userAvailability == true) {
            this.subscription = this.cable.subscriptions.create({channel: 'AvailabilityChannel'}, {
                subscribed(data){
                    console.log("subscribed")
                },
                received(data){
                    comp.receiveNotificationData(data)
                },
                claimAppointment(message){
                    return this.perform('claim_vibiio', message)
                }
            })
        } else {
            this.notificationShow = false
            this.subscription.unsubscribe()
        }
    }

    claimAppointment(event){
        console.log(event)
        this.subscription.claimAppointment({
            vibiiographer_id: this.vibiiographerProfile.user.profile.id,
            vibiio_id: event.content.vibiio_id,
            consumer_id: event.content.consumer_id
        })
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.vibiio = data.vibiio
            // this.session = OT.initSession(OPENTOK_API_KEY, this.vibiio.video_session_id)
            this.vibiiographerProfile = data.myProfile

        });
        this.cable = ActionCable.createConsumer(`${ACTION_CABLE_URL}`, this.jwt)
  };
}
