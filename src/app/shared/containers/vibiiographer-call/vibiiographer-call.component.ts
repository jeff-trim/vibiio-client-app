import { animate, style, transition, trigger } from "@angular/animations";
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  OnDestroy,
  Output,
  ViewChild
} from "@angular/core";
import { Subscription, Observable } from "rxjs/Rx";

// Libraries
import * as ActionCable from "action-cable-react-jwt";

// Components
import { VideoChatComponent } from "../../components/video-chat/video-chat.component";

// Models
import { Vibiio } from "../../../dashboard/models/vibiio.interface";
import { User } from "../../../dashboard/models/user.interface";
import { VIDEO_OPTIONS } from "../../../constants/video-options";
import { StreamData } from "../../models/transfer-objects/stream-data";

// Services
import { ActivityService } from "../../services/activity.service";
import { AddToCallService } from "../../services/add-to-call.service";
import { VideoChatService } from "../../services/video-chat.service";
import { VideoSnapshotService } from "../../services/video-snapshot.service";
import { AuthService } from "../../../services/auth.service";

// ENV
import { OPENTOK_API_KEY } from "../../../../environments/environment";
import { ACTION_CABLE_URL } from "../../../../environments/environment";

declare var OT: any;

@Component({
  selector: "vib-vibiiographer-call",
  templateUrl: "./vibiiographer-call.component.html",
  styleUrls: ["./vibiiographer-call.component.scss"],
  animations: [
    trigger("slideUpDown", [
      transition(":enter", [
        style({ transform: "translateY(100%)" }),
        animate("600ms cubic-bezier(0.64, 0.04, 0.35, 1)")
      ]),
      transition(":leave", [
        style({ transform: "translateY(0)", height: "*" }),
        animate(600, style({ transform: "translateY(100%)", height: "0" }))
      ])
    ]),
    trigger("expandableState", [
      transition(":enter", [
        style({ transform: "translateY(100%)", height: "0%" }),
        animate(
          "600ms cubic-bezier(0.64, 0.04, 0.35, 1)",
          style({ transform: "translateY(0%)", height: "*" })
        )
      ]),
      transition(":leave", [
        style({ transform: "translateY(0%)", height: "*" }),
        animate(
          "600ms cubic-bezier(0.64, 0.04, 0.35, 1)",
          style({ transform: "translateY(100%)", height: "0%" })
        )
      ])
    ])
  ]
})
export class VibiiographerCallComponent implements OnInit, OnDestroy {
  vibiioConnecting: boolean;
  onVibiio: boolean;
  vibiioFullscreen = false;
  token: string;
  publisher: any;
  session: any;
  subscriber: any;
  expert: any;
  imgData: any;
  streams: StreamData[] = [];
  showControls = true;
  muted = false;
  alive: boolean;
  enableFullscreen = true;
  expertName: string;
  message: string;
  expertWaitingToJoin = false;
  showNotification = false;
  fadeTimer: Observable<any>;
  fadeSubscription: Subscription;
  hangUpTimer: Observable<any>;
  hangUpSubscription: Subscription;
  cable: any;
  subscription: any;
  readonly jwt: string = this.authService.getToken();

  chime = new Audio("/assets/audio/chime.mp3");

  @Input() vibiio: Vibiio;
  @Input() outgoingCall = true;
  @Input() consumerName: string;

  @Output() updateVibiioStatus = new EventEmitter<any>();

  @ViewChild(VideoChatComponent) videoChatComponent: VideoChatComponent;

  constructor(
    private videoService: VideoChatService,
    private snapshotService: VideoSnapshotService,
    private activityService: ActivityService,
    private addToCall: AddToCallService,
    private authService: AuthService
  ) {}

  @HostListener("document:webkitfullscreenchange", [])
  chromeFullscreen() {
    this.vibiioFullscreen = !this.vibiioFullscreen;
  }

  @HostListener("document:mozfullscreenchange", [])
  mozFullscreen() {
    this.vibiioFullscreen = !this.vibiioFullscreen;
  }

  @HostListener("document:fullscreenchange", [])
  safFullscreen() {
    this.vibiioFullscreen = !this.vibiioFullscreen;
  }

  @HostListener("document:MSfullscreenchange", [])
  ieFullscreen() {
    this.vibiioFullscreen = !this.vibiioFullscreen;
  }

  toggleVibiioFullscreen() {
    const el = document.getElementById("full");

    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  ngOnInit() {
    this.alive = true;
    this.vibiioConnecting = true;
    this.getConnectionData();
    if (this.outgoingCall) {
      this.callConsumer();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getConnectionData() {
    this.videoService
      .getConnectionData(this.vibiio.id, undefined, undefined)
      .takeWhile(() => this.alive)
      .subscribe(data => {
        this.token = data.connection_data.token_data.token;
        this.connectToSession();
      });
  }

  addExpert(expert: User) {
    this.message = `A text message has been sent to ${expert.first_name} ${expert.last_name} inviting them to the call.`;
    this.addToCall
      .callUser(expert.id, this.vibiio.id)
      .takeWhile(() => this.alive)
      .subscribe(data => {
        this.consumerName = data.consumer;
        this.expertWaitingToJoin = true;
        this.setNotificationFadeOutTimer();
      });
  }

  setNotificationFadeOutTimer() {
    if (this.fadeSubscription) {
      this.fadeSubscription.unsubscribe();
    }

    this.fadeTimer = Observable.timer(3000);
    this.showNotification = true;

    this.fadeSubscription = this.fadeTimer.subscribe(() => {
      this.showNotification = false;
    });
  }

  callConsumer() {
    this.videoService
      .dialConsumer(this.vibiio.id)
      .takeWhile(() => this.alive)
      .subscribe(res => {});
    this.subscribeToCallNotifications();
  }

  subscribeToCallNotifications() {
    const comp = this;
    this.cable = ActionCable.createConsumer(`${ACTION_CABLE_URL}`, this.jwt);
    this.subscription = this.cable.subscriptions.create(
      { channel: "CallChannel", vibiio_id: this.vibiio.id },
      {
        received(data) {
          if (data.call_rejected) {
            comp.processCallRejected();
          }
        }
      }
    );
  }

  processCallRejected() {
    this.showCallRejectedNotification();
    this.setHangUpTimer();
  }

  showCallRejectedNotification() {
    this.message = `${this.consumerName} has rejected your call. Try again later.`;
    this.showNotification = true;
  }

  setHangUpTimer() {
    this.hangUpTimer = Observable.timer(4000);

    this.hangUpSubscription = this.hangUpTimer.subscribe(() => {
      this.showNotification = false;
      this.endSession();
    });
  }

  private connectToSession() {
    this.session = OT.initSession(
      OPENTOK_API_KEY,
      this.vibiio.video_session_id
    );
    this.session.connect(this.token, () => {
      this.initPublisher();
      this.hideVibiiographerVideo();
      this.subscribeToStreamCreatedEvents();
      this.subscribeToStreamDestroyedEvents();
    });

    this.triggerActivity(
      this.vibiio.id,
      "Videograher manually started video",
      "Video session started"
    );
  }

  subscribeToStreamCreatedEvents() {
    this.session.on("streamCreated", data => {
      this.onVibiio = true;
      this.vibiioConnecting = false;
      const stream = data.stream;

      if (this.expertWaitingToJoin) {
        this.expertConnected(stream);
      }

      // multiple archives fix
      if (!this.isAlreadySubscribed(stream)) {
        this.processNewStream(stream);
      }
    });
  }

  isAlreadySubscribed(stream: any): boolean {
    let isAlreadySubscribed = false;
    const subscribers = this.session.getSubscribersForStream(stream);

    for (const subscriber of subscribers) {
      if (this.streamExists(subscriber, stream)) {
        isAlreadySubscribed = true;
      }
    }
    return isAlreadySubscribed;
  }

  streamExists(subscriber: any, stream: any): boolean {
    return (
      subscriber.stream.connection.connectionId ===
      stream.connection.connectionId
    );
  }

  processNewStream(stream: any) {
    const streamData: StreamData = this.videoService.parseStreamData(stream);
    this.addToStreamsArray(streamData);
    this.filterStreamData(streamData);
    this.subscribe(stream);
  }

  isExpertStream(streamData: StreamData): boolean {
    return (
      streamData.profile === "Expert" || streamData.profile === "Vibiiographer"
    );
  }

  isConsumerStream(streamData: StreamData): boolean {
    return streamData.profile === "Consumer";
  }

  expertConnected(streamData: StreamData) {
    this.expertName = streamData.firstName;
    this.expertWaitingToJoin = false;
    this.chime.play();
  }

  consumerConnected(streamData: StreamData) {
    this.consumerName = streamData.firstName;
  }

  addToStreamsArray(streamData: StreamData) {
    this.streams.push(streamData);
  }

  filterStreamData(streamData: StreamData) {
    if (this.isExpertStream(streamData)) {
      this.expertConnected(streamData);
    } else {
      this.consumerConnected(streamData);
    }
  }

  subscribe(stream: any) {
    this.subscriber = this.session.subscribe(
      stream,
      "subscriber-stream",
      VIDEO_OPTIONS,
      stats => {
        if (this.streams.length === 1) {
          setTimeout(() => this.captureSnapshot(), 5000);
        }
      }
    );
  }

  subscribeToStreamDestroyedEvents() {
    this.session.on("streamDestroyed", data => {
      const stream = data.stream;
      this.processUnsubscribe(stream);
    });
  }

  processUnsubscribe(stream: any) {
    const streamId = stream.connection.connectionId;
    const streamData: StreamData = this.videoService.parseStreamData(stream);
    this.removeStreamFromArray(streamId);
    this.removeNameDisplay(streamData);

    if (this.isLastStream()) {
      this.stopPublishing();
    }
  }

  removeStreamFromArray(streamId: string) {
    this.streams.forEach((stream, index) => {
      if (stream.streamId === streamId) {
        this.streams.splice(index, 1);
      }
    });
  }

  removeNameDisplay(streamData: StreamData) {
    if (this.isExpertStream(streamData)) {
      this.expertName = null;
    } else {
      this.consumerName = null;
    }
  }

  isLastStream(): boolean {
    return this.streams.length === 0;
  }

  stopPublishing() {
    if (this.subscriber) {
      this.session.unsubscribe(this.subscriber);
      this.subscriber.destroy();
    }
    if (this.publisher && this.session) {
      this.session.unpublish(this.publisher);
      this.publisher.destroy();
      this.session.disconnect();
      this.notifiyAPIEndOFCall();
    }
    this.videoService.hangUp();
  }

  captureSnapshot() {
    this.imgData = this.subscriber.getImgData();
    this.saveSnapshot();
  }

  saveSnapshot() {
    this.snapshotService
      .saveSnapshot(
        this.vibiio.consumer_id,
        this.session.id,
        this.vibiio.id,
        this.imgData
      )
      .takeWhile(() => this.alive)
      .subscribe(
        data => {},
        error => {
          console.log("error ", error);
        }
      );
  }

  endSession() {
    this.stopPublishing();
    this.triggerActivity(
      this.vibiio.id,
      "Videographer manually ended video session",
      "Video session ended"
    );

    this.notifiyAPIEndOFCall();
  }

  notifiyAPIEndOFCall() {
    if (this.onVibiio) {
      this.videoService.endOfCall(this.vibiio.id).subscribe(
        () => {
          console.log("api updated");
        },
        error => {
          console.log("error ", error);
        }
      );
    }
  }

  updateStatus(status: any) {
    this.updateVibiioStatus.emit(status);
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.publisher.publishAudio(false);
    } else {
      this.publisher.publishAudio(true);
    }
  }

  private initPublisher() {
    this.publisher = OT.initPublisher(
      { insertDefaultUI: false },
      VIDEO_OPTIONS
    );
  }

  private hideVibiiographerVideo() {
    this.session.publish(this.publisher).publishVideo(false);
  }

  private triggerActivity(vibiio_id: number, message: string, name: string) {
    this.activityService
      .postActivity(vibiio_id, message, name)
      .takeWhile(() => this.alive)
      .subscribe(data => {});
  }
}
