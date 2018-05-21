import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Vibiio } from '../../../dashboard/models/vibiio.interface';

@Component({
  selector: 'vib-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss']
})
export class VideoChatComponent {
  @Input() vibiioConnecting: boolean;
  @Input() onVibiio = false;
  @Input() vibiioFullscreen = false;
  @Input() enableFullscreen = true;
  @Input() showControls;

  @Input() vibiio: Vibiio;
  @Input() consumerName: string;
  @Input() expertName: string;

  @Output() updateVibiioStatus = new EventEmitter<any>();
  @Output() toggleFullscreen = new EventEmitter<boolean>();
  @Output() mute = new EventEmitter<boolean>();
  @Output() endCall = new EventEmitter<boolean>();
  @Output() add = new EventEmitter<boolean>();

  @ViewChild('fullSubscriberScreen') fullSubscriberStream: ElementRef;

  updateStatus(status: any) {
    this.updateVibiioStatus.emit(status);
  }

  toggleVibiioFullscreen() {
    this.toggleFullscreen.emit(true);
  }

  hangUp() {
    this.endCall.emit(true);
  }

  toggleMute(muted: boolean) {
    this.mute.emit(muted);
  }

  addExpert() {
    this.add.emit(true);
  }
}
