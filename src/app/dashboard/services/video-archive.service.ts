import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { API_URL } from '../../../environments/environment';

const VIDEO_ARCHIVE_API = `${API_URL}/video_chat/archives/?session_id=`;

@Injectable()
export class VideoArchiveService {

    constructor(private http: Http) { }

      getArchive(session_id: number) {
         return this.http
        .get(VIDEO_ARCHIVE_API + session_id)
        .map((response: Response) => response.json());
  }
}
