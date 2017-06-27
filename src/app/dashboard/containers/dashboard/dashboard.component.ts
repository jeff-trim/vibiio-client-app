import { Component, OnInit, Inject } from '@angular/core'
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

// libaries
import * as ActionCable from 'actioncable'

// Models
import { Vibiio } from '../../models/vibiio.interface'
import { VideoChatToken } from '../../models/video-chat-token.interface'
import { OPENTOK_API_KEY } from '../../../../environments/environment'

// Services
import { VideoChatTokenService } from '../../services/video-chat-token.service'
import { MyProfileResolver } from '../../services/my-profile.resolver.service'

declare var OT: any;


@Component({
    selector: 'app-vibiio', styleUrls: ['./dashboard.component.scss'],
  template: `
<div class="row">
  <app-sidebar class="col-xs-12
                      col-md-3
                      side-bar-component">
  </app-sidebar>
  <div class="col-xs-12
              col-md-9
              dashboard-outlet">
    <appointment-notification
      [notificationData]="waitingConsumers[0]"
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

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private tokenService: VideoChatTokenService
    ){}

    receiveNotificationData(data){
        this.waitingConsumers.unshift({
            consumerName: data.consumer_name,
            consumerId: data.consumer_id,
            vibiioId: data.vibiio_id
        })
        this.notificationShow = true
    }

    claimAppointment(event){
        this.subscription.claimAppointment({
            vibiiographer_id: this.vibiiographerProfile.user.profile.id,
            vibiio_id: event.vibiioId,
            consumer_id: event.consumerId
        })
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.vibiio = data.vibiio
            this.session = OT.initSession(OPENTOK_API_KEY, this.vibiio.video_session_id)
            this.vibiiographerProfile = data.myProfile

        });
        let cable = ActionCable.createConsumer('ws://localhost:3000/cable')
        let comp = this
        this.subscription = cable.subscriptions.create('AvailabilityChannel', {
            received(data){
                console.log(data)
                comp.receiveNotificationData(data)
            },
            claimAppointment(message){
                return this.perform('claim_vibiio', message)
            }
        })


  };
}
