import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Vibiio } from '../../../dashboard/models/vibiio.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { User } from '../../../dashboard/models/user.interface';

@Component({
  selector: 'vib-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss'],
  animations: [
    trigger('expandableState', [
        transition(':enter', [
            style({ transform: 'translateY(100%)', height: '0%' }),
            animate('600ms cubic-bezier(0.64, 0.04, 0.35, 1)',
                style({ transform: 'translateY(0%)', height: '*' })),
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)', height: '*' }),
            animate('600ms cubic-bezier(0.64, 0.04, 0.35, 1)',
                style({ transform: 'translateY(100%)', height: '0%' })),
        ]),
    ]),
    trigger('visibilityChanged', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
    ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 }))
      ]),
    ])
  ]
})

export class VideoChatComponent {
  closeSearch = true;
  vibiioFullscreen = false;

  @Input() vibiioConnecting: boolean;
  @Input() onVibiio = false;
  @Input() enableFullscreen = true;
  @Input() showControls;
  @Input() vibiio: Vibiio;
  @Input() consumerName: string;
  @Input() expertName: string;
  @Input() message: string;
  @Input() showNotification = false;

  @Output() updateVibiioStatus = new EventEmitter<any>();
  @Output() mute = new EventEmitter<boolean>();
  @Output() endCall = new EventEmitter<boolean>();
  @Output() add = new EventEmitter<User>();
  @Output() exitSearch = new EventEmitter<boolean>();

  @ViewChild('fullSubscriberScreen') fullSubscriberStream: ElementRef;

  updateStatus(status: any) {
    this.updateVibiioStatus.emit(status);
  }

  toggleVibiioFullscreen() {
    this.vibiioFullscreen = !this.vibiioFullscreen;
  }

  hangUp() {
    this.endCall.emit(true);
  }

  toggleMute(muted: boolean) {
    this.mute.emit(muted);
  }

  addExpert(user: User) {
    this.add.emit(user);
  }

  toggleSearch() {
    this.closeSearch = !this.closeSearch;
    if (!this.closeSearch && !this.vibiioFullscreen) {
        this.showControls = false;
    } else {
        this.showControls = true;
    }
  }
}
