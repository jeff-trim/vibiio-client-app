import { Component, OnInit} from '@angular/core'
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

// libaries
import * as ActionCable from 'actioncable'

// Containers
import { MyProfileComponent } from '../my-profile/my-profile.component'
import { SidebarComponent } from './../sidebar/sidebar.component'

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

    constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private tokenService: VideoChatTokenService
    ){
        this.cable.debugging = true
        this.cable.subscriptions.create('AvailabilityChannel', {
            received: function(data){
                console.log(data)
                console.log("received")
            }
        })
    }

    ngOnInit() {
    this.activatedRoute.data.subscribe( (data) => {
      this.vibiio = data.vibiio;
      this.session = OT.initSession(OPENTOK_API_KEY, this.vibiio.video_session_id);
    });
  };
}
