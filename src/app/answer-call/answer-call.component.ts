import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { consumerSignUp } from '../sign-up/services/form-config';
import { VideoChatService } from '../shared/services/video-chat.service';
import { VIDEO_OPTIONS } from '../constants/video-options';

@Component({
  selector: 'vib-answer-call',
  templateUrl: './answer-call.component.html',
  styleUrls: ['./answer-call.component.scss']
})
export class AnswerCallComponent implements OnInit {
  token: string;
  sessionId: string;
  consumerName: string;
  vibiiographerName: string;
  subscriber: any;
  publisher: any;
  callData: any;
  session: any;
  streams = [];
  muted = false;
  callEnded = false;
  enableAddExpert = false;

  constructor(private activatedRoute: ActivatedRoute,
              private videoChatService: VideoChatService,
              private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.callData = data.callData.connection_data;
      this.token = this.callData.token_data.token;
      this.sessionId = this.callData.video_session_id;
      this.consumerName = this.callData.consumer;
      this.vibiiographerName = this.callData.vibiiographer;
    });
    this.connectCall();
  }

  connectCall() {
    this.session = this.videoChatService.initSession(this.sessionId);
    this.session.connect(this.token, () => {
      this.initPublisher();
      this.hideVideo();
      this.subscribeToStreamCreatedEvents();
      this.subscribeToStreamDestroyedEvents();
    });
  }

  subscribeToStreamCreatedEvents() {
    this.session.on('streamCreated', (event) => {
      this.subscriber = this.session.subscribe(event.stream, 'video-stream', VIDEO_OPTIONS,
        (stats) => {});
        this.streams.push(event.stream.connection.connectionId);
    });
  }

  subscribeToStreamDestroyedEvents() {
    this.session.on('streamDestroyed', (data) => {
        const streamId = data.stream.connection.connectionId;
        this.removeStreamFromArray(streamId);

        if (this.isLastStream()) {
            this.hangUp();
        }
    });
  }

  removeStreamFromArray(streamId: string) {
    this.streams = this.streams.filter(stream => stream !== streamId);
  }

  isLastStream(): boolean {
    return this.streams.length === 0;
  }

  private initPublisher() {
    this.publisher = this.videoChatService.initPublisher();
  }

  private hideVideo() {
    this.session.publish(this.publisher).publishVideo(false);
  }

  hangUp() {
    this.callEnded = true;
    this.ref.detectChanges();
    this.session.disconnect();
    this.stopPublishing();
  }

  stopPublishing() {
    if (this.subscriber) {
        this.session.unsubscribe(this.subscriber);
        this.subscriber.destroy();
    }
    if (this.publisher) {
        this.session.unpublish(this.publisher);
        this.publisher.destroy();
    }
}

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
        this.publisher.publishAudio(false);
    } else {
        this.publisher.publishAudio(true);
    }
  }
}
