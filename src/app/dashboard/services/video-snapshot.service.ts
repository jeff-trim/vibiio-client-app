import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class VideoSnapshotService {
  constructor(private http: Http) {}

  saveSnapshot(id: number, snapshot: any) {
    const url = `${API_URL}/video_chat/snapshot`;

    const payload = {
      video_chat: {
        session_id: id,
        snapshot: snapshot
      }
    };

    return this.http
               .post(url, payload)
               .map( (response: Response) => response.json() )
               .catch( (error: any) => Observable.throw(error));
  }
}
