import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import intersection from 'lodash/intersection';
import * as ActionCable from 'action-cable-react-jwt';

// Services
import { AvailabilitySharedService } from '../../shared/services/availability-shared.service';
import { AuthService } from '../../services/auth.service';

// Models & env
import { NotificationWrapper } from '../models/notification-wrapper.interface';
import { Notification } from '../models/notification.interface';
import { NotificationFilterCriteria } from '../models/notification-filter-criteria.interface';
import { ACTION_CABLE_URL } from '../../../environments/environment';


@Injectable()
export class NotificationService {
  private emitWaitingList = new Subject<any[]>();
  private emitClaimedAppointment = new Subject<number>();

  waitListUpdates$ = this.emitWaitingList.asObservable();
  claimedAppointments$ = this.emitClaimedAppointment.asObservable();

  userAvailable: boolean;
  availibilityChannelCable: any;
  availibilityChannelSubscription: any;
  wrappedNotification: NotificationWrapper;
  notification: Notification;
  waitingConsumers = [];
  spokenLanguages: string[];
  companyIds: number[];
  isVibiioStaff: boolean;
  readonly jwt: string = this.authService.getToken();

  constructor(private authService: AuthService,
              private availabilitySharedService: AvailabilitySharedService,
              private router: Router) {

    this.availabilitySharedService.changeEmitted$.subscribe(available => {
      if (available) {
          this.subscribeToAvailabilityChannel();
      } else {
          this.unsubscribeFromAvailabilityChannel();
      }
    });

  this.availibilityChannelCable = ActionCable.createConsumer(`${ACTION_CABLE_URL}`, this.jwt);

  }

  subscribeToAvailabilityChannel() {
    const comp = this;

    this.availibilityChannelSubscription = this.availibilityChannelCable.subscriptions.create({channel: 'AvailabilityChannel'}, {
        connected(data) {
            return this.getWaitingList();
        },
        received(data) {
            return comp.receiveWrappedNotification(data);
        },
        getWaitingList() {
            return this.perform('get_waiting_list');
        },
        claimAppointment(message) {
            return this.perform('claim_vibiio', message);
        }
    });
  }

  selectNotification(notificationData: any, vibiiographer_id: number) {
    this.availibilityChannelSubscription.claimAppointment({
      vibiiographer_id: vibiiographer_id,
      vibiio_id: notificationData.content.vibiio_id,
      consumer_id: notificationData.content.consumer_id
    });
  }

  setfilterCriteria(filter: NotificationFilterCriteria) {
    this.spokenLanguages = filter.languages;
    console.log(this.spokenLanguages);
    this.isVibiioStaff = filter.isVibiioStaff;
    this.companyIds = filter.companyIds;
  }

  private unsubscribeFromAvailabilityChannel() {
    this.availibilityChannelSubscription.unsubscribe();
    this.clearWaitList();
  }

  private clearWaitList() {
    this.waitingConsumers = [];
    this.updateWaitList(this.waitingConsumers);
  }

  private receiveWrappedNotification(data: NotificationWrapper) {
    this.wrappedNotification = data;
    console.log('receiveWrappedNotification data: ', data);
    switch (data.type_of) {
        case 'waiting_list': {
            return this.fetchWaitingList(data);
        }
        case 'notification': {
           return this.receiveNotificationData(data.content);
        }
        case 'remove_waiting_consumer': {
           return this.removeNotification(data);
        }
    }
  }

  private receiveNotificationData(data) {
    this.notification = data;

    switch (this.notification.notification_type) {
      case 'notification': {
        if (this.filterNotification(data.content)) {
          this.waitingConsumers = [ { waitListItem: this.notification }, ...this.waitingConsumers ];
          this.updateWaitList(this.waitingConsumers);
        }
        break;
      }
      case 'error': {
        console.log('error recieving notification');
        break;
      }
      case 'success': {
        this.unsubscribeFromAvailabilityChannel();
        this.availabilitySharedService.emitChange(false);
        this.navigateToAppointment(data.content.appointment_id);
      }
    }
  }

  private navigateToAppointment(appointmentId: number) {
    this.emitClaimedAppointment.next(appointmentId);
  }

  private fetchWaitingList(data) {
    for (const notification of data.content){
        return this.receiveNotificationData(notification);
    }
  }

  private removeNotification(data) {
    for (const consumer in this.waitingConsumers) {
      if (this.waitingConsumers[+consumer].waitListItem.content.vibiio_id === data.content.vibiio_id) {
        this.waitingConsumers = [
            ...this.waitingConsumers.slice(0, +consumer),
            ...this.waitingConsumers.slice(+consumer + 1)
        ];
        this.updateWaitList(this.waitingConsumers);
      }
    }
  }

  private updateWaitList(list: any[]) {
    this.emitWaitingList.next(list);
  }


// Notification filters
  private filterNotification(content: any): boolean {
    if (this.speaksVibiiographersLanguage(content.language) && (this.isValidCompany(content.companies))) {
      return true;
    } else {
      return false;
    }
  }

  private speaksVibiiographersLanguage(language): boolean {
    return this.spokenLanguages.includes(language.toLowerCase());
  }

  private isValidCompany(companies: number[]): boolean {
    if (this.isVibiioStaff) {
        return true;
    } else {
        return (intersection(this.companyIds, companies).length > 0);
    }
  }
}
