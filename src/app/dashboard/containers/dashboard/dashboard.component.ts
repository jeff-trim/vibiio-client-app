import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// libaries
import * as ActionCable from 'action-cable-react-jwt';
import intersection from 'lodash/intersection';

// Models
import { Vibiio } from '../../models/vibiio.interface';
import { VideoChatToken } from '../../models/video-chat-token.interface';
import { NotificationWrapper } from '../../models/notification-wrapper.interface';

// Services
import { MyProfileResolver } from '../../services/my-profile.resolver.service';
import { AuthService } from '../../../services/auth.service';
import { AvailabilitySharedService } from '../../../shared/services/availability-shared.service';

// environment
import { ACTION_CABLE_URL } from '../../../../environments/environment';
import { OPENTOK_API_KEY } from '../../../../environments/environment';

declare var OT: any;


@Component({
    selector: 'vib-vibiio', styleUrls: ['./dashboard.component.scss'],
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    session: any;
    vibiio: Vibiio;
    subscription: any;
    notificationShow = false;
    vibiiographerProfile: any;
    waitingConsumers = [];
    currentNotificationData = {};
    availabilityParams: boolean;
    userAvailability: boolean;
    cable: any;
    readonly jwt: string = this.authService.getToken();
    notificationDrawerVisibility = false;
    spokenLanguages: string[];
    companyIds: number[];
    isVibiioAccount: boolean;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private availabilitySharedService: AvailabilitySharedService
    ) {
        // subscribes to shared service and listens for changes passed from the
        // my appointment container
        this.availabilitySharedService.changeEmitted$.subscribe(
            data => {
              this.toggleActionCable(data);
            }
        );
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {

            this.vibiio = data.vibiio;
            this.vibiiographerProfile = data.myProfile;
            this.spokenLanguages = this.vibiiographerProfile.user.profile.languages;
            this.companyIds = this.vibiiographerProfile.user.profile.company_ids;
            this.isVibiioAccount = ('Vibiio' === this.vibiiographerProfile.user.company);
            console.log(this.vibiiographerProfile.user.company);
            console.log(this.isVibiioAccount);
        });

        this.cable = ActionCable.createConsumer(`${ACTION_CABLE_URL}`, this.jwt);
        this.toggleActionCable(true);
    }

    receiveNotificationData(data) {
        switch (data.notification_type) {
            case 'notification': {
                    this.waitingConsumers = [ { consumerData: data }, ...this.waitingConsumers ];
                    this.currentNotificationData = data;
                    this.notificationShow = true;
                break;
            }
            case 'error': {
                this.currentNotificationData = data;
                break;
            }
            case 'success': {
                this.toggleActionCable(false);
                this.userAvailability = false;
                this.router.navigate(['/dashboard/appointment/',
                                        data.content.appointment_id],
                                        { queryParams: { startVibiio: true },
                                            preserveQueryParams: false });
                break;
            }
        }
    }

    receiveData(data: NotificationWrapper) {
        switch (data.type_of) {
            case 'waiting_list': {
                this.fillWaitingList(data);
                break;
            }
            case 'notification': {
                this.receiveNotificationData(data.content);
                break;
            }
            case 'remove_waiting_consumer': {
                this.removeNotification(data);
                break;
            }
        }
    }

    fillWaitingList(data) {
        for (const notification of data.content){
            this.receiveNotificationData(notification);
        }
    }

    removeNotification(data) {
        for (const consumer in this.waitingConsumers) {
            if (this.waitingConsumers[+consumer].consumerData.content.vibiio_id === data.content.vibiio_id) {
                this.waitingConsumers = [
                    ...this.waitingConsumers.slice(0, +consumer),
                    ...this.waitingConsumers.slice(+consumer + 1)
                ];
                break;
            }
        }
    }

    toggleActionCable(event: boolean) {
        this.userAvailability = event;
        const comp = this;

        if (event) {
            this.subscription = this.cable.subscriptions.create({channel: 'AvailabilityChannel'}, {
                connected(data) {
                    this.getWaitingList();
                },
                received(data) {
                    comp.receiveData(data);
                },
                getWaitingList() {
                    return this.perform('get_waiting_list');
                },
                claimAppointment(message) {
                    return this.perform('claim_vibiio', message);
                }
            });
        } else {
            this.notificationShow = false;
            this.waitingConsumers = [];
            this.subscription.unsubscribe();
        }
    }

    claimAppointment(event) {
        this.subscription.claimAppointment({
            vibiiographer_id: this.vibiiographerProfile.user.profile.id,
            vibiio_id: event.content.vibiio_id,
            consumer_id: event.content.consumer_id
        });
    }

    toggleNotificationDrawerVisibility(event) {
        this.notificationDrawerVisibility = !this.notificationDrawerVisibility;
    }

    filterNotification(content: any): boolean {
        if (this.speaksVibiiographersLanguage(content.language)) {
            return true;
        } else {
            return false;
        }
    }

    speaksVibiiographersLanguage(language): boolean {
        return this.spokenLanguages.includes(language);
     }

     sameCompany?(companies: number[]) {
         if (this.isVibiioAccount) {
             return true;
         } else {
             return (intersection(this.companyIds, companies).length > 0);
         }
     }

}
