import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  notification: Notification;

  constructor() { }

  receiveNotificationData(data) {
    this.notification = data;
    console.log(this.notification);

    switch (data.notification_type) {
        case 'notification': {
            console.log();

            if (this.filterNotification(data.content)) {
                this.waitingConsumers = [ { consumerData: data }, ...this.waitingConsumers ];
                this.currentNotificationData = data;
                this.notificationShow = true;
            }
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

// notification filters
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
