import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'vib-expert-added-notification',
  templateUrl: './expert-added-notification.component.html',
  styleUrls: ['./expert-added-notification.component.scss']
})
export class ExpertAddedNotificationComponent implements OnChanges {
  @Input() expertFullName: string;
  message: string;

  ngOnChanges() {
    this.message = `A text message has been sent to ${this.expertFullName} inviting them to the call.`;
  }

}
