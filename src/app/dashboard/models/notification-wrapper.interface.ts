import { Notification } from './notification.interface'

export interface NotificationWrapper {
    type_of: string;
    content:  Notification | Array<Notification>;
}
