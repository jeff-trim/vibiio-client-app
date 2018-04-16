import { Injectable } from '@angular/core';
import { OPENTOK_API_KEY } from '../../../environments/environment.staging';

declare var OT: any;

@Injectable()
export class VideoChatService {
  session: any;
  publisher: any;
  subscriber: any;

  constructor() { }

  initSession(video_session_id: string) {
    return OT.initSession(OPENTOK_API_KEY, video_session_id);
  }
}
