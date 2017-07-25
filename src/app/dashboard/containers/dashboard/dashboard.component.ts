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
import { AuthService } from '../../../services/auth.service'

// environment
import { ACTION_CABLE_URL } from '../../../../environments/environment';

declare var OT: any;


@Component({
    selector: 'app-vibiio', styleUrls: ['./dashboard.component.scss'],
  template: `
<div class="row">
  <app-sidebar (emitAvailability)="toggleActionCable($event)"
               [available]="userAvailability"
               class="col-xs-12
                      col-md-3
                      side-bar-component">
  </app-sidebar>
  <div class="col-xs-12
              col-md-9
              dashboard-outlet">
<span *ngFor="let consumer of waitingConsumers">
<appointment-notification
      [notificationData]="consumer['consumerData']"
      (claimAppointment)="claimAppointment($event)"
      *ngIf="notificationShow"></appointment-notification>
</span>

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
    userAvailability: boolean = false
    cable: any
    readonly jwt: string = this.authService.getToken()

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private tokenService: VideoChatTokenService,
        private authService: AuthService
    ){}

    receiveNotificationData(data){
        switch(data.notification_type){
        case "notification": {
                this.waitingConsumers.unshift({consumerData: data})
                this.currentNotificationData = data
                this.notificationShow = true
                break;
            }
            case "error": {
                this.currentNotificationData = data
                break;
            }
            case "success": {
                this.toggleActionCable(false)
                this.userAvailability = false
                this.router.navigateByUrl("/dashboard/appointment/" +
                                          data.content.appointment_id)
                break;
            }
        }
     }

    receiveData(data){
        console.log(data)
        switch (data.type){
            case 'waiting_list': {
                for(let notification of data.content){
                    this.receiveNotificationData(notification)
                }
            }
            case 'notification': {
                this.receiveNotificationData(data.content)
            }
        }
    }

    toggleActionCable(event){
        this.userAvailability = event
        let comp = this
        if(this.userAvailability == true) {
            this.subscription = this.cable.subscriptions.create({channel: 'AvailabilityChannel'}, {
                connected(data){
                    this.getWaitingList()
                },
                received(data){
                    console.log(data)
                    comp.receiveData(data)
                },
                getWaitingList(){
                    return this.perform('get_waiting_list')
                },
                claimAppointment(message){
                    return this.perform('claim_vibiio', message)
                }
            })
        } else {
            this.notificationShow = false
            this.waitingConsumers = []
            this.subscription.unsubscribe()
        }
    }

    claimAppointment(event){
        this.subscription.claimAppointment({
            vibiiographer_id: this.vibiiographerProfile.user.profile.id,
            vibiio_id: event.content.vibiio_id,
            consumer_id: event.content.consumer_id
        })
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.vibiio = data.vibiio
            this.vibiiographerProfile = data.myProfile
        });
        this.cable = ActionCable.createConsumer(`${ACTION_CABLE_URL}`, this.jwt)
  };
}
