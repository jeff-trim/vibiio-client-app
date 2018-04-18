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

  initSession(video_session_id: string) {
    return OT.initSession(OPENTOK_API_KEY, '1_MX40NTk5OTUyMn5-MTUyNDA2NjI5Nzk3Mn5IdGNTbjlUb21KWkFsOXBqZENxb2ZtUnJ-fg');
    // return 'T1==cGFydG5lcl9pZD00NTgwNzA4MiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9NDVhY2MxYWE1ZGYyYWExNWU4YmYwYWEwNzM0YWI3OGE1YzEzZTk4NDpzZXNzaW9uX2lkPTJfTVg0ME5UZ3dOekE0TW41LU1UVXlOREExT0RReE1UYzVNbjVGY21WWVoyeFRRMHBNU21FemRIcGlSM05pVkRSNk1FcC1mZyZjcmVhdGVfdGltZT0xNTI0MDU4NTg0JnJvbGU9c3Vic2NyaWJlciZub25jZT0xNTI0MDU4NTg0LjI3MDQxNzM4Njg4Mjk5JmV4cGlyZV90aW1lPTE1MjY2NTA1ODQ='
  }

  initPublisher() {
    return OT.initPublisher({insertDefaultUI: false}, VIDEO_OPTIONS);
  }
}
