import { Component, OnInit} from '@angular/core'
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
    selector: 'app-vibiio',
    styleUrls: ['./dashboard.component.scss'],
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
      [name]="userName()"></appointment-notification>
    <router-outlet></router-outlet>
  </div>
</div>
`,
})

export class DashboardComponent implements OnInit {
    session: any;
    vibiio: Vibiio;
    token: VideoChatToken;
    cable = ActionCable.createConsumer('ws://localhost:3000/cable')
    subscription
    myProfile

    constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private tokenService: VideoChatTokenService
    ){
        this.subscription = this.cable.subscriptions.create('AvailabilityChannel', {
            startVibiio(message){
                return this.perform('start_vibiio', message)
            }

        })
    }

    userName(){
        return `${this.myProfile.user.first_name} ${this.myProfile.user.last_name}`
    }

    sendMessage(consumer_id){
        this.subscription.startVibiio({
            vibiiographer_id: this.myProfile.profile.id,
            consumer_id: consumer_id
        })
    }

    ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
        this.vibiio = data.vibiio
        this.session = OT.initSession(OPENTOK_API_KEY, this.vibiio.video_session_id)
        this.myProfile = data.myProfile
    });
  };
}
