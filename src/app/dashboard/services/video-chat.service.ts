import { Injectable } from '@angular/core';
import { OPENTOK_API_KEY } from '../../../environments/environment.staging';

declare var OT: any;

const VIDEO_OPTIONS = {
  insertMode: 'append',
  fitMode: 'contain',
  width: '100%',
  height: '100%'
};

@Injectable()
export class VideoChatService {

  initSession(video_session_id: string) {
    return OT.initSession(OPENTOK_API_KEY, video_session_id);
  }

  initPublisher() {
    return OT.initPublisher({insertDefaultUI: false}, VIDEO_OPTIONS);
  }
}
