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
import { NotificationService } from '../../services/notification.service';

declare var OT: any;


@Component({
    selector: 'vib-vibiio', styleUrls: ['./dashboard.component.scss'],
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    userAvailability: boolean;
    session: any;
    vibiio: Vibiio;
    vibiiographerProfile: any;
    waitingConsumers = [];
    notificationDrawerVisibility = false;
    // availabilityParams: boolean;
    // currentNotificationData = {};
    // notificationShow = false;
    // spokenLanguages: string[];
    // companyIds: number[];
    // isVibiioAccount: boolean;
    // readonly jwt: string = this.authService.getToken();
    // cable: any;
    // subscription: any;
    // wrappedNotification: NotificationWrapper;
    // notification: Notification;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationService
        // private availabilitySharedService: AvailabilitySharedService,
        // private authService: AuthService,
    ) {
        // subscribes to shared service and listens for changes passed from the
        // my appointment container
        // this.availabilitySharedService.changeEmitted$.subscribe(
            // data => {
            //   this.toggleActionCable(data);
            // }
            // available => {
                // if (available) {
                    // this.subscribeToNotifications();
                // } else {
                    // this.unsubscribeFromNotifications();
                // }
            // }
        // );
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.vibiio = data.vibiio;
            this.vibiiographerProfile = data.myProfile;
            // this.spokenLanguages = this.vibiiographerProfile.user.profile.languages;
            // this.companyIds = this.vibiiographerProfile.user.profile.company_ids;
            // this.isVibiioAccount = ('Vibiio' === this.vibiiographerProfile.user.company);
        });

        // this.cable = ActionCable.createConsumer(`${ACTION_CABLE_URL}`, this.jwt);
        // this.toggleActionCable(true);
        this.subscribeToWaitList();
    }

    subscribeToWaitList() {
        console.log('subscribe');
        // this.cable = ActionCable.createConsumer(`${ACTION_CABLE_URL}`, this.jwt);
        this.notificationService.subscribeToAvailabilityChannel().subscribe(waitListData => {
            console.log('datadad');

            console.log(waitListData);

            // if (waitListData.appointmentId) {
            //     this.router.navigate(['/dashboard/appointment/', waitListData.appointmentId],
            //                          { queryParams: { startVibiio: true },
            //                          preserveQueryParams: false }
            //                         );
            // } else {
            //     this.waitingConsumers = waitListData.waitingList;
            // }
        });
    }

    // unsubscribeFromNotifications() {
    //     this.notificationService.unsubscribeFromAvailabilityChannel();
    // }

    toggleNotificationDrawerVisibility(event) {
        this.notificationDrawerVisibility = !this.notificationDrawerVisibility;
    }

    // receiveWrappedNotification(data: NotificationWrapper) {
    //     console.log('recieveData data: ', data);
    //     this.wrappedNotification = data;
    //     switch (this.wrappedNotification.type_of) {
    //         case 'waiting_list': {
    //             this.fillWaitingList(this.wrappedNotification);
    //             break;
    //         }
    //         case 'notification': {
    //             this.receiveNotificationData(this.wrappedNotification.content);
    //             break;
    //         }
    //         case 'remove_waiting_consumer': {
    //             this.removeNotification(this.wrappedNotification);
    //             break;
    //         }
    //     }
    // }

    // receiveNotificationData(data) {
    //     console.log('receiveNotificiation data:', data);

    //     switch (data.notification_type) {
    //         case 'notification': {
    //             console.log();

    //             if (this.filterNotification(data.content)) {
    //                 this.waitingConsumers = [ { consumerData: data }, ...this.waitingConsumers ];
    //                 console.log(this.waitingConsumers);

    //                 this.currentNotificationData = data;
    //                 this.notificationShow = true;
    //             }
    //             break;
    //         }
    //         case 'error': {
    //             this.currentNotificationData = data;
    //             break;
    //         }
    //         case 'success': {
    //             this.toggleActionCable(false);
    //             this.userAvailability = false;
    //             this.router.navigate(['/dashboard/appointment/',
    //                                     data.content.appointment_id],
    //                                     { queryParams: { startVibiio: true },
    //                                         preserveQueryParams: false });
    //             break;
    //         }
    //     }
    // }

    // fillWaitingList(data) {
    //     for (const notification of data.content){
    //         this.receiveNotificationData(notification);
    //     }
    // }

    // removeNotification(data) {
    //     for (const consumer in this.waitingConsumers) {
    //         if (this.waitingConsumers[+consumer].consumerData.content.vibiio_id === data.content.vibiio_id) {
    //             this.waitingConsumers = [
    //                 ...this.waitingConsumers.slice(0, +consumer),
    //                 ...this.waitingConsumers.slice(+consumer + 1)
    //             ];
    //             break;
    //         }
    //     }
    // }

    // toggleActionCable(connected: boolean) {
    //     this.userAvailability = connected;
    //     const comp = this;

    //     if (this.userAvailability) {
    //         this.subscription = this.cable.subscriptions.create({channel: 'AvailabilityChannel'}, {
    //             connected(data) {
    //                 this.getWaitingList();
    //             },
    //             received(data) {
    //                 comp.receiveWrappedNotification(data);
    //             },
    //             getWaitingList() {
    //                 return this.perform('get_waiting_list');
    //             },
    //             claimAppointment(message) {
    //                 return this.perform('claim_vibiio', message);
    //             }
    //         });
    //         console.log(this.subscription);
    //     } else {
    //         this.notificationShow = false;
    //         this.subscription.unsubscribe();
    //         this.waitingConsumers = [];
    //     }
    // }

    // claimAppointment(event) {
    //     this.subscription.claimAppointment({
    //         vibiiographer_id: this.vibiiographerProfile.user.profile.id,
    //         vibiio_id: event.content.vibiio_id,
    //         consumer_id: event.content.consumer_id
    //     });
    // }


    // filterNotification(content: any): boolean {
    //     if (this.speaksVibiiographersLanguage(content.language)
    //         && (this.isValidCompany(content.companies) || this.isSameCompany)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // speaksVibiiographersLanguage(language): boolean {
    //     return this.spokenLanguages.includes(language);
    //  }

    // isValidCompany(companies: number[]): boolean {
    //     if (this.isVibiioAccount) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // isSameCompany(companies: number[]): boolean {
    //     return (intersection(this.companyIds, companies).length > 0);
    //  }

}
