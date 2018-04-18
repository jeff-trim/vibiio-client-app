import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vibiio } from '../../models/vibiio.interface';

@Component({
  selector: 'vib-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss']
})
export class VideoChatComponent {
  @Input() vibiioConnecting: boolean;
  @Input() onVibiio: boolean;
  @Input() vibiioFullscreen: boolean;
  @Input() vibiio: Vibiio;
  @Input() networkDisconnected: boolean;

  @Output() updateVibiioStatus = new EventEmitter<any>();
  @Output() toggleFullscreen = new EventEmitter<boolean>();

  updateStatus(status: any) {
    this.updateVibiioStatus.emit(status);
  }

    toggleVibiioFullscreen() {
      this.toggleFullscreen.emit(true);
    }
}
