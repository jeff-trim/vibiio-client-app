import { Injectable } from '@angular/core';
import { NotificationWrapper } from '../models/notification-wrapper.interface';
import intersection from 'lodash/intersection';
import * as ActionCable from 'action-cable-react-jwt';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../services/auth.service';
import { ACTION_CABLE_URL } from '../../../environments/environment';
import { AvailabilitySharedService } from '../../shared/services/availability-shared.service';
import { Notification } from '../models/notification.interface';

@Injectable()
export class NotificationService {
  userAvailable: boolean;
  availibilityChannelCable: any;
  availibilityChannelSubscription: any;
  wrappedNotification: NotificationWrapper;
  notification: Notification;
  waitingConsumers = [];
  spokenLanguages: string[];
  companyIds: number[];
  isVibiioAccount: boolean;
  readonly jwt: string = this.authService.getToken();

  constructor(private authService: AuthService,
              private availabilitySharedService: AvailabilitySharedService) {

    this.availabilitySharedService.changeEmitted$.subscribe(available => {
      if (available) {
          this.availibilityChannelSubscription();
      } else {
          this.unsubscribeFromAvailabilityChannel();
      }
    });

  this.availibilityChannelCable = ActionCable.createConsumer(`${ACTION_CABLE_URL}`, this.jwt);

  }

  subscribeToAvailabilityChannel(): Observable<any> {
    const comp = this;

    this.availibilityChannelSubscription = this.availibilityChannelCable.subscriptions.create({channel: 'AvailabilityChannel'}, {
        connected(data) {
            return this.getWaitingList(); // returns waiting list, subUSer true, available user true
        },
        received(data) {
            return comp.receiveWrappedNotification(data); // returns waiting list, subUSer true, available user true
        },
        getWaitingList() {
            return this.perform('get_waiting_list');
        },
        claimAppointment(message) {
            return this.perform('claim_vibiio', message);
        }
    });
    return { waitList: this.waitingConsumers };
  }

  unsubscribeFromAvailabilityChannel() {
    this.availibilityChannelSubscription.unsubscribe();
  }

  receiveWrappedNotification(data: NotificationWrapper) {
    this.wrappedNotification = data;
    console.log('receiveWrappedNotification data: ', data);
    switch (data.type_of) {
        case 'waiting_list': {
            return this.fetchWaitingList(data); // returns waiting list, available true, sub true.
        }
        case 'notification': {
           return this.receiveNotificationData(data.content); // returns waiting list, avaible = true, sub = true
        }
        case 'remove_waiting_consumer': {
           return this.removeNotification(data);  // returns waiting list, avaible = true, sub = true
        }
    }
}

  receiveNotificationData(data) {
    this.notification = data;
    console.log(this.notification);
    switch (this.notification.notification_type) {
      case 'notification': {
        console.log('add to list', this.waitingConsumers = [ { waitListItem: this.notification }, ...this.waitingConsumers ]);
        return { waitList: this.waitingConsumers = [ { waitListItem: this.notification }, ...this.waitingConsumers ]};
      }
      case 'error': {
        return { waitList: this.waitingConsumers };
      }
      case 'success': {
        this.unsubscribeFromAvailabilityChannel();
        this.availabilitySharedService.emitChange(false);
        return { waitList: [], appointmentId:  data.content.appointment_id };
      }
    }
  }

  // waiting list actions
  fetchWaitingList(data) {
    for (const notification of data.content){
        return this.receiveNotificationData(notification);
    }
  }

  removeNotification(data) {
    for (const consumer in this.waitingConsumers) {
      if (this.waitingConsumers[+consumer].waitListItem.content.vibiio_id === data.content.vibiio_id) {
        this.waitingConsumers = [
            ...this.waitingConsumers.slice(0, +consumer),
            ...this.waitingConsumers.slice(+consumer + 1)
        ];
        return { waitList: this.waitingConsumers };
      }
    }
  }

// // notification filters
  filterNotification(content: any): boolean {
    if (this.speaksVibiiographersLanguage(content.language)
        && (this.isValidCompany(content.companies) || this.isSameCompany)) {
        return true;
    } else {
        return false;
    }
  }

  speaksVibiiographersLanguage(language): boolean {
    return this.spokenLanguages.includes(language);
  }

  isValidCompany(companies: number[]): boolean {
    if (this.isVibiioAccount) {
        return true;
    } else {
        return false;
    }
  }

  isSameCompany(companies: number[]): boolean {
    return (intersection(this.companyIds, companies).length > 0);
  }

}
