import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
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
  @Input() networkDisconnected = false;

  @Input() vibiio: Vibiio;

  @Output() updateVibiioStatus = new EventEmitter<any>();
  @Output() toggleFullscreen = new EventEmitter<boolean>();

  updateStatus(status: any) {
    this.updateVibiioStatus.emit(status);
  }

  toggleVibiioFullscreen() {
    this.toggleFullscreen.emit(true);
  }
}
