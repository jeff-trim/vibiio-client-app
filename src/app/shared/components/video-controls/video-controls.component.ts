import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'vib-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.scss']
})
export class VideoControlsComponent {
  @Input() muted: boolean = false; // placeholder

  @Output() mute = new EventEmitter<boolean>();
  @Output() endCall = new EventEmitter<boolean>();
  @Output() add = new EventEmitter<boolean>();

  hangUp() {
    this.endCall.emit(true);
  }

  soundOff() {
    this.mute.emit(true);
  }

  addExpert() {
    this.add.emit(true);
  }
}
