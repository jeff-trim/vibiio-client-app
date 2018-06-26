import { Component, Input } from '@angular/core';

@Component({
  selector: 'vib-sm-notification',
  templateUrl: './sm-notification.component.html',
  styleUrls: ['./sm-notification.component.scss']
})
export class SmNotificationComponent {
  @Input() message: string;
}
