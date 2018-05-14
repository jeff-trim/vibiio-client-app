import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
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
  onVibiio = false;
  callEnded = false;

  constructor(private activatedRoute: ActivatedRoute,
              private videoChatService: VideoChatService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.callData = data.callData;
      this.token = this.callData.token.token;
      this.sessionId = this.callData.session_id;
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
    this.changeDetector.detectChanges();
    this.session.on('streamCreated', (data) => {
      this.onVibiio = true;
        // if it's the first stream create a chat, else subscribe to audio
        this.streams.push(data.stream);
        console.log('streams', this.streams.length);
        if (!this.subscriber) {
            this.subscriber = this.session.subscribe(data.stream, 'video-stream', VIDEO_OPTIONS,
            (stats) => {
              // this.detectSubscriberAudio();
            });
          }
          this.changeDetector.detectChanges();
    });
  }

  subscribeToStreamDestroyedEvents() {
    this.session.on('streamDestroyed', (data) => {
      this.onVibiio = false;
      this.callEnded = true;
      this.changeDetector.detectChanges();
      this.session.disconnect();
    });
  }

  private initPublisher() {
    this.publisher = this.videoChatService.initPublisher();
  }

  private hideVideo() {
    this.session.publish(this.publisher).publishVideo(false);
  }

  hangUp() {
    this.session.disconnect();
    this.onVibiio = false;
    this.callEnded = true;
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
        this.publisher.publishAudio(false);
    } else {
        this.publisher.publishAudio(true);
    }
    this.changeDetector.detectChanges();
  }


}
