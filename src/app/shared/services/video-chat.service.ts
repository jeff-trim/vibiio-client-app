import { Injectable } from '@angular/core';
import { OPENTOK_API_KEY } from '../../../environments/environment.staging';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { VIDEO_OPTIONS } from '../../constants/video-options';

declare var OT: any;

@Injectable()
export class VideoChatService {

  constructor(private http: Http) {}

  getToken(vibiio_id: number): Observable<any> {
    const url = `${API_URL}/video_chat/auth_tokens`;

    const payload = {
      video_chat_auth_token: {
        vibiio_id: 6
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

  callConsumer(vibiio_id: number): Observable<any> {
    const url = `${API_URL}/video_chat/vibiiographer_call`;

    const payload = {
      call: {
        vibiio_id: vibiio_id
      }
    };

   return this.http
                .post(url, payload)
                .map( (response: Response) => console.log(response));
  }
}
