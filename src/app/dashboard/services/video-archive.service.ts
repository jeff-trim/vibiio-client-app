import { Injectable } from "@angular/core";
import { HttpClient, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { API_URL } from "../../../environments/environment";

const VIDEO_ARCHIVE_API = `${API_URL}/video_chat/archives/`;

@Injectable()
export class VideoArchiveService {
  constructor(private http: HttpClient) {}

  getArchive(session_id: string) {
    return this.http
      .get(VIDEO_ARCHIVE_API + session_id)
      .map((response: any) => response);
  }
}
