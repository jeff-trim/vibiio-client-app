import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// Models
import { VideoChatToken } from '../../dashboard/models/video-chat-token.interface';

@Injectable()
export class VideoChatTokenService {
  constructor(private http: Http) {}

  getToken(id: number): Observable<any> {
    const url = `${API_URL}/video_chat/auth_tokens`;

    const payload = {
      video_chat_auth_token: {
        vibiio_id: id
      }
    };

    return this.http
               .post(url, payload)
               .map( (response: Response) => response.json() )
               .catch( (error: any) => Observable.throw(error));
  }
}
