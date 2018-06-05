import { Injectable } from '@angular/core';
import { OPENTOK_API_KEY } from '../../../environments/environment.staging';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { VIDEO_OPTIONS } from '../../constants/video-options';
import { Subject } from 'rxjs/Subject';
import { VideoCall } from '../models/video-call.interface';
import { Vibiio } from '../../dashboard/models/vibiio.interface';
import { ConnectionData } from '../models/transfer-objects/connection-data';

declare var OT: any;

@Injectable()
export class VideoChatService {
  private callingConsumer = new Subject<VideoCall>();
  private endingCall = new Subject<any>();

  calling$ = this.callingConsumer.asObservable();
  hangingUp$ = this.endingCall.asObservable();

  constructor(private http: Http) {}

  // event emitters
  call(vibiio: Vibiio, outgoing: boolean) {
      this.callingConsumer.next({ vibiio: vibiio, outgoing: outgoing });
  }

  hangUp() {
      this.endingCall.next();
  }

  connectionUrl(vibiio_id?: number, token?: string, userId?: number): string {
    if (vibiio_id) {
     return `${API_URL}/connect?vibiio_id=${vibiio_id}`;
    } else {
      return `${API_URL}/connect?user=${userId}&token=${token}`;
    }
  }

  getConnectionData(vibiio_id?: number, token?: string, userId?: number): Observable<any> {
    const url =  this.connectionUrl(vibiio_id, token, userId);

    return this.http
               .get(url)
               .map( (response: Response) => response.json())
               .catch( (error: any) => Observable.throw(error));
  }

  initSession(video_session_id: string) {
    return OT.initSession(OPENTOK_API_KEY, video_session_id);
  }

  initPublisher() {
    return OT.initPublisher({insertDefaultUI: false}, VIDEO_OPTIONS);
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
