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
    console.log(this.callData);
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
              this.detectSubscriberAudio();
                });
        this.changeDetector.detectChanges();
        }
    });
  }

  subscribeToStreamDestroyedEvents() {
    this.session.on('streamDestroyed', (data) => {
      this.onVibiio = false;
      this.callEnded = true;
        // if it's the first stteam
        const idx = this.streams.indexOf(data.stream);
        if (idx > -1) {
            this.streams.splice(idx, 1);
            this.changeDetector.detectChanges();
        }

        if (this.streams.length === 1) {
            this.changeDetector.detectChanges();
            this.session.disconnect();
        }
      });
    }

  private initPublisher() {
    this.publisher = this.videoChatService.initPublisher();
  }

  private hideVideo() {
    this.session.publish(this.publisher).publishVideo(false);
  }

  detectSubscriberAudio() {
    this.subscriber.on('audioLevelUpdated', (data) => {
        const now = Date.now();
        let activity;
        if (data.audioLevel > 0.2) {
            if (!activity) {
                activity = {timestamp: now, talking: false};
            } else if (activity.talking) {
                activity.timestamp = now;
            } else if (now - activity.timestamp > 1000) {
                // detected audio activity for more than 1s
                // for the first time.
                activity.talking = true;
                this.startTalking();
            }
        } else if (activity && now - activity.timestamp > 3000) {
            // detected low audio activity for more than 3s
            if (activity.talking) {
                this.stopTalking();
            }
            activity = null;
        }
    });
  }

  startTalking() {
    console.log('talking');
  }

  stopTalking() {
    console.log('silence');
  }

  hangUp() {
    this.session.disconnect();
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
