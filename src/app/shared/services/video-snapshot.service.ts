import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { API_URL } from "../../../environments/environment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

// Models
import { VideoSnapshot } from "../../dashboard/models/video-snapshot.interface";

const url = `${API_URL}/video_chat/snapshots`;

@Injectable()
export class VideoSnapshotService {
  constructor(private http: Http) {}

  saveSnapshot(
    consumer_id: number,
    session_id: string,
    vibiio_id: number,
    snapshot: any
  ): Observable<any> {
    const payload = {
      video_session: {
        consumer_id: consumer_id,
        session_id: session_id,
        vibiio_id: vibiio_id,
        image: `data:image/png;base64,${snapshot}`
      }
    };

    return this.http
      .post(url, payload)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }
}
