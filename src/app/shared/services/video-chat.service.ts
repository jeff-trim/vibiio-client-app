import { Injectable } from '@angular/core';
import { OPENTOK_API_KEY } from '../../../environments/environment.staging';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { VIDEO_OPTIONS } from '../../constants/video-options';
import { EXPERT_VIDEO_OPTIONS } from '../../constants/expert-video-options';
import { Subject } from 'rxjs/Subject';
import { VideoCall } from '../models/video-call.interface';
import { Vibiio } from '../../dashboard/models/vibiio.interface';

declare var OT: any;

@Injectable()
export class VideoChatService {
  private callingConsumer = new Subject<VideoCall>();
  private endingCall = new Subject<Vibiio>();

  calling$ = this.callingConsumer.asObservable();
  hangingUp$ = this.endingCall.asObservable();

  constructor(private http: Http) {}

  // event emitters
  call(vibiio: Vibiio, outgoing: boolean) {
      this.callingConsumer.next({ vibiio: vibiio, outgoing: true });
  }

  hangUp(vibiio: Vibiio) {
      this.endingCall.next(vibiio);
  }


  getToken(vibiio_id: number): Observable<any> {
    const url = `${API_URL}/video_chat/auth_tokens`;

    const payload = {
      video_chat_auth_token: {
        vibiio_id: vibiio_id
      }
    };

    return this.http
               .post(url, payload)
               .map( (response: Response) => response.json() )
               .catch( (error: any) => Observable.throw(error));
  }

  initSession(video_session_id: string) {
    return OT.initSession(OPENTOK_API_KEY, video_session_id);
  }

  initPublisher() {
    return OT.initPublisher({insertDefaultUI: false}, VIDEO_OPTIONS);
  }

  initExpertPublisher() {
    return OT.initPublisher({insertDefaultUI: false}, EXPERT_VIDEO_OPTIONS);
  }

  dialConsumer(vibiio_id: number): Observable<any> {
    const url = `${API_URL}/video_chat/vibiiographer_call`;

    const payload = {
      call: {
        vibiio_id: vibiio_id
      }
    };

   return this.http
                .post(url, payload)
                .map( (response: Response) => response.json())
                .catch( (error: any) => Observable.throw(error));
  }
}
